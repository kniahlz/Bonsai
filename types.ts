
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  type: TransactionType;
  accountId: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'INVESTMENT' | 'REAL_ESTATE' | 'LOAN' | 'VEHICLE';
  balance: number;
  lastUpdated: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  type: 'DEBT' | 'SAVINGS' | 'EMERGENCY';
  icon?: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  spent: number;
  type: 'NEED' | 'WANT';
}

export interface IrregularExpense {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  saved: number;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'WARNING' | 'OPPORTUNITY' | 'INFO';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
