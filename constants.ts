
import { Account, BudgetCategory, Goal, Insight, IrregularExpense, Transaction, TransactionType } from './types';

export const ACCOUNTS: Account[] = [
  { id: '1', name: 'Chase Sapphire', type: 'CREDIT_CARD', balance: -2450.00, lastUpdated: '2023-10-25' },
  { id: '2', name: 'Wells Fargo Checking', type: 'CHECKING', balance: 5230.50, lastUpdated: '2023-10-25' },
  { id: '3', name: 'Ally High Yield', type: 'SAVINGS', balance: 15000.00, lastUpdated: '2023-10-24' },
  { id: '4', name: 'Vanguard 401k', type: 'INVESTMENT', balance: 84500.25, lastUpdated: '2023-10-24' },
  // New Assets & Liabilities
  { id: '5', name: 'Primary Residence', type: 'REAL_ESTATE', balance: 450000.00, lastUpdated: '2023-10-01' },
  { id: '6', name: 'Chase Mortgage', type: 'LOAN', balance: -385000.00, lastUpdated: '2023-10-01' },
  { id: '7', name: 'Tesla Model 3', type: 'VEHICLE', balance: 28000.00, lastUpdated: '2023-10-01' },
  { id: '8', name: 'Car Loan', type: 'LOAN', balance: -15000.00, lastUpdated: '2023-10-01' },
];

export const GOALS: Goal[] = [
  { id: '1', title: 'Clear Credit Card Debt', targetAmount: 2450, currentAmount: 800, type: 'DEBT', icon: 'credit-card' },
  { id: '2', title: 'Emergency Fund', targetAmount: 20000, currentAmount: 15000, type: 'EMERGENCY', icon: 'shield' },
  { id: '3', title: 'Vacation to Italy', targetAmount: 8000, currentAmount: 2400, type: 'SAVINGS', deadline: '2024-06-01', icon: 'plane' },
];

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  { id: '1', name: 'Housing', limit: 2000, spent: 2000, type: 'NEED' },
  { id: '2', name: 'Groceries', limit: 600, spent: 450, type: 'NEED' },
  { id: '3', name: 'Dining Out', limit: 300, spent: 320, type: 'WANT' },
  { id: '4', name: 'Utilities', limit: 250, spent: 180, type: 'NEED' },
  { id: '5', name: 'Entertainment', limit: 200, spent: 45, type: 'WANT' },
  { id: '6', name: 'Transport', limit: 150, spent: 120, type: 'NEED' },
  { id: '7', name: 'Shopping', limit: 200, spent: 215, type: 'WANT' },
  { id: '8', name: 'Health', limit: 100, spent: 0, type: 'NEED' },
];

export const IRREGULAR_EXPENSES: IrregularExpense[] = [
  { id: 'ie1', title: 'Car Insurance (6mo)', amount: 600, dueDate: '2024-02-15', saved: 200 },
  { id: 'ie2', title: 'Holiday Gifts', amount: 800, dueDate: '2023-12-20', saved: 400 },
  { id: 'ie3', title: 'Property Tax', amount: 2400, dueDate: '2024-04-10', saved: 1200 },
];

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2023-10-25', merchant: 'Whole Foods Market', amount: 142.50, category: 'Groceries', type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't2', date: '2023-10-24', merchant: 'Netflix', amount: 15.99, category: 'Entertainment', type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't3', date: '2023-10-23', merchant: 'Shell Station', amount: 45.00, category: 'Transport', type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't4', date: '2023-10-22', merchant: 'Direct Deposit', amount: 3200.00, category: 'Income', type: TransactionType.INCOME, accountId: '2' },
  { id: 't5', date: '2023-10-21', merchant: 'Local Coffee Shop', amount: 6.50, category: 'Dining Out', type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't6', date: '2023-10-20', merchant: 'Uber', amount: 24.50, category: 'Transport', type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't7', date: '2023-10-20', merchant: 'Amazon', amount: 42.90, category: 'Shopping', type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't8', date: '2023-10-19', merchant: 'Trader Joes', amount: 85.20, category: 'Groceries', type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't9', date: '2023-10-18', merchant: 'Spotify', amount: 9.99, category: 'Entertainment', type: TransactionType.EXPENSE, accountId: '1' },
  { id: 't10', date: '2023-10-18', merchant: 'Electric Bill', amount: 120.00, category: 'Utilities', type: TransactionType.EXPENSE, accountId: '2' },
];

export const INSIGHTS: Insight[] = [
  { id: 'i1', title: 'Dining Overspend', description: 'You have exceeded your dining budget by $20 this month. Consider cooking at home this weekend.', type: 'WARNING' },
  { id: 'i2', title: 'Savings Opportunity', description: 'Based on your recurring bills, you could move $200 more to your High Yield Savings account safely.', type: 'OPPORTUNITY' },
  { id: 'i3', title: 'Subscription Alert', description: 'You have 2 subscriptions renewing next week (Netflix, Spotify).', type: 'INFO' },
];
