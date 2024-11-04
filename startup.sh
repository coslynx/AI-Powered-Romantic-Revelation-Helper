#!/bin/bash

# Set strict error handling
set -euo pipefail

# Load environment variables
if [ -f .env ]; then
  source .env
fi

# Validate essential environment variables
for var in DATABASE_URL NEXTAUTH_SECRET GOOGLE_CLIENT_ID GOOGLE_CLIENT_SECRET; do
  if [ -z "${!var}" ]; then
    echo "Error: Environment variable '$var' is not set." >&2
    exit 1
  fi
done

# Declare project-specific variables
PROJECT_ROOT=$(pwd)
LOG_FILE="$PROJECT_ROOT/logs/startup.log"
PID_FILE="$PROJECT_ROOT/logs/startup.pid"
DATABASE_TIMEOUT=30
BACKEND_TIMEOUT=30
FRONTEND_TIMEOUT=30
HEALTH_CHECK_INTERVAL=5

# Utility functions
log_info() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - INFO: $*" >> "$LOG_FILE"
}
log_error() {
  echo "$(date +"%Y-%m-%d %H:%M:%S") - ERROR: $*" >&2
}
cleanup() {
  if [ -f "$PID_FILE" ]; then
    pid=$(cat "$PID_FILE")
    if [ -n "$pid" ]; then
      kill -9 "$pid"
      log_info "Stopped all services."
    fi
  fi
  rm -f "$PID_FILE"
  log_info "Removed PID file."
}

# Health check functions
check_port() {
  nc -z "$1" "$2" &> /dev/null
  if [ $? -eq 0 ]; then
    return 0
  else
    return 1
  fi
}
wait_for_service() {
  local port="$1"
  local service_name="$2"
  local timeout="$3"
  local elapsed=0
  while ((elapsed < timeout)); do
    if check_port "$service_name" "$port"; then
      log_info "Service '$service_name' is ready."
      return 0
    fi
    sleep "$HEALTH_CHECK_INTERVAL"
    ((elapsed+=HEALTH_CHECK_INTERVAL))
  done
  log_error "Timeout waiting for service '$service_name' to start."
  exit 1
}
verify_service() {
  local service_name="$1"
  # Add your specific service health check logic here
  if [ ...service health check commands... ]; then
    log_info "Service '$service_name' is healthy."
    return 0
  else
    log_error "Service '$service_name' is not healthy."
    exit 1
  fi
}

# Service management functions
start_database() {
  log_info "Starting database service..."
  sudo pg_ctl start
  wait_for_service "postgres" "5432" "$DATABASE_TIMEOUT"
  verify_service "postgres"
  store_pid $$
}
start_backend() {
  log_info "Starting backend service..."
  cd "$PROJECT_ROOT"
  npm run dev
  wait_for_service "localhost" "3000" "$BACKEND_TIMEOUT"
  verify_service "backend"
  store_pid $$
}
start_frontend() {
  log_info "Starting frontend service..."
  cd "$PROJECT_ROOT"
  npm run dev
  wait_for_service "localhost" "3000" "$FRONTEND_TIMEOUT"
  verify_service "frontend"
  store_pid $$
}
store_pid() {
  echo "$1" > "$PID_FILE"
  log_info "PID stored in '$PID_FILE'."
}

# Main script execution
trap cleanup EXIT ERR

log_info "Starting AI Powered Romantic Revelation Helper MVP..."

start_database
start_backend
start_frontend

log_info "All services started successfully."