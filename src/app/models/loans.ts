export class Loans {
  loanId!: number;
  pinNo!: string;
  bookId!: number;
  issueDate!: string;  // ISO string date
  dueDate!: string;    // ISO string date
  returnDate!: string | null;
  status!: string; // 'ISSUED', 'OVERDUE', 'RETURNED'
}
