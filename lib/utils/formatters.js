import { IntlShape, FormattedNumber, FormattedDate } from 'react-intl';

interface FormatCurrencyOptions {
  style?: 'currency' | 'decimal' | 'percent';
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

interface FormatDateOptions {
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
}

export function formatCurrency(value: number, options?: FormatCurrencyOptions): string {
  if (typeof value !== 'number') {
    throw new Error('Invalid value for currency formatting');
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

export function formatDate(date: Date, options?: FormatDateOptions): string {
  if (!(date instanceof Date)) {
    throw new Error('Invalid date for formatting');
  }
  return date.toLocaleDateString('en-US', options);
}

export function truncateText(text: string, maxLength: number): string {
  if (typeof text !== 'string') {
    throw new Error('Invalid text for truncation');
  }
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}