<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
AI-Powered Romantic Revelation Helper
</h1>
<h4 align="center">A web application that uses AI to generate personalized romantic gestures</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="">
  <img src="https://img.shields.io/badge/Frontend-TypeScript,_React,_HTML,_CSS-red" alt="">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="">
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/AI-Powered-Romantic-Revelation-Helper?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/AI-Powered-Romantic-Revelation-Helper?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/AI-Powered-Romantic-Revelation-Helper?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "AI-Powered Romantic Revelation Helper" that provides a comprehensive solution using the following tech stack: Next.js, TypeScript, React, HTML, CSS, Node.js, and Custom LLMs including Gemini and OpenAI. The application aims to help users create personalized and thoughtful romantic gestures for their partners. 

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase follows a modular architectural pattern with separate directories for different functionalities, ensuring easier maintenance and scalability.             |
| 📄 | **Documentation**  | The repository includes a README file that provides a detailed overview of the Minimum Viable Product (MVP), its dependencies, and usage instructions.|
| 🔗 | **Dependencies**   | The codebase relies on various external libraries and packages such as Next.js, React, Zustand, Prisma, and Tailwind CSS, which are essential for building and styling the UI components, handling data persistence, and managing authentication. |
| 🧩 | **Modularity**     | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for different functionalities such as components, API routes, and utility functions.|
| 🧪 | **Testing**        | Implement unit tests using frameworks like Jest or React Testing Library to ensure the reliability and robustness of the codebase.       |
| ⚡️  | **Performance**    | The performance of the system can be optimized based on factors such as the browser and hardware being used. Consider implementing performance optimizations for better efficiency.|
| 🔐 | **Security**       | Enhance security by implementing measures such as input validation, data encryption, and secure communication protocols.|
| 🔀 | **Version Control**| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | **Integrations**   | Integrates with external services through HTTP requests, such as Google OAuth for user authentication, and leverages external APIs for fetching data to enrich recommendations.|
| 📶 | **Scalability**    | Design the system to handle increased user load and data volume, utilizing caching strategies and cloud-based solutions for better scalability.           |

## 📂 Structure
```text
ai-powered-romantic-revelation-helper
├── app
│   ├── page.js
│   ├── layout.js
│   └── components
│       ├── PartnerProfileForm.js
│       ├── RecommendationsList.js
│       ├── RecommendationCard.js
│       ├── Header.js
│       └── Footer.js
├── api
│   ├── auth
│   │   └── [...nextauth].js
│   └── recommendations
│       └── route.js
├── lib
│   ├── utils
│   │   ├── formatters.js
│   │   └── helpers.js
│   └── types.ts
├── styles
│   └── globals.css
├── prisma
│   └── schema.prisma
└── public
    ├── favicon.ico
    └── index.html

```

## 💻 Installation

### 🔧 Prerequisites
- Node.js v16+
- npm 6+ or yarn 1+
- PostgreSQL 14+
- Docker (optional, for local development)

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/AI-Powered-Romantic-Revelation-Helper.git
   cd AI-Powered-Romantic-Revelation-Helper
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - **Option 1: Using Docker**
     ```bash
     docker-compose up -d
     ```
   - **Option 2: Manual Setup**
     - Install PostgreSQL on your system
     - Create a new database: `CREATE DATABASE ai_powered_romantic_revelation_helper;`
     - Configure the `DATABASE_URL` environment variable in `.env` file with your database credentials.

4. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   - Replace placeholders in `.env` file with your actual credentials.

## 🏗️ Usage

### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application:
   - Web interface: [http://localhost:3000](http://localhost:3000)

### ⚙️ Configuration
- The application's configuration is primarily managed through the `.env` file, which contains environment variables like database connection details, API keys, and authentication secrets. 

### 📚 Examples
- **Create a Partner Profile** (using the `app/components/PartnerProfileForm.js`):
  - Fill in the form fields with your partner's information.
  - Click "Create Profile."

- **View Personalized Recommendations** (using the `app/components/RecommendationsList.js` and `app/components/RecommendationCard.js`):
  - Once a partner profile is created, the application displays a list of personalized recommendations based on their preferences.
  - Click on a recommendation card to view more details.

- **Save to Favorites:**
  - Click on the heart icon next to a recommendation to add it to your favorites list.

## 🌐 Hosting

### 🚀 Deployment Instructions
- This MVP is designed to be deployed using a platform like Vercel. 

**Steps to Deploy to Vercel:**
1. Create a Vercel account or login to an existing one.
2. Import the project to Vercel by clicking "New Project" on the Vercel dashboard and choosing "Import from Git."
3. Select "GitHub" as the source and choose the "AI-Powered-Romantic-Revelation-Helper" repository.
4. Vercel will guide you through the setup process, automatically configuring the build commands and other settings.
5. Configure your environment variables within the Vercel dashboard, including `DATABASE_URL`, `NEXTAUTH_SECRET`, and any other necessary variables.
6. Click "Deploy" to launch your application on Vercel.

### 🔑 Environment Variables
- `DATABASE_URL`: The connection string for your PostgreSQL database, accessible through your hosting platform's environment variables.
- `NEXTAUTH_SECRET`: A secret key used by NextAuth.js for securely signing JWT tokens.
- `GOOGLE_CLIENT_ID`: Your Google Client ID, used to integrate Google OAuth authentication.
- `GOOGLE_CLIENT_SECRET`: Your Google Client Secret, used to integrate Google OAuth authentication.
- `NEXTAUTH_URL`:  The URL where your NextAuth.js instance is running.

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: AI-Powered-Romantic-Revelation-Helper

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>