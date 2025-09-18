import { Component, OnInit } from '@angular/core';
import { Loans } from 'src/app/models/loans'; // You'll create this
import { Member } from 'src/app/models/members.model';
import { Book } from 'src/app/models/book.model';
import { LoansService } from 'src/app/services/loans.service';
import { MembersService } from 'src/app/services/members.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  loans: Loans[] = [];
  filteredLoans: Loans[] = [];
  members: Member[] = [];
  books: Book[] = [];
  availableBooks: Book[] = [];

  searchTerm: string = '';
  selectedStatus: string = 'All';

  page: number = 1;

  isAddModalOpen: boolean = false;

  newLoan: Partial<Loans> = {
    pinNo: '',
    bookId: 0,
  };

  memberIsActive: boolean = false;
  canLoanBook: boolean = false;

  constructor(
    private loanService: LoansService,
    private memberService: MembersService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.loadMembers();
    this.loadBooks();
    this.loadLoans();
  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe((data) => {
      this.members = data;
    });
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.updateAvailableBooks();
    });
  }

  loadLoans(): void {
    this.loanService.getLoans().subscribe((data) => {
      this.loans = data;
      this.checkOverdueLoans();
      this.applyFilters();
    });
  }

  checkOverdueLoans(): void {
    const today = new Date();
    this.loans.forEach((loan) => {
      if (
        loan.status === 'ISSUED' &&
        new Date(loan.dueDate) < today &&
        !loan.returnDate
      ) {
        loan.status = 'OVERDUE';
        // Optional: update status on backend
        this.loanService.updateLoanStatus(loan.loanId, 'OVERDUE').subscribe();
      }
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredLoans = this.loans.filter((loan) => {
      const memberName = this.getMemberName(loan.pinNo).toLowerCase();
      const bookDisplay = this.getBookDisplay(loan.bookId).toLowerCase();
      const matchesSearch =
        memberName.includes(term) || bookDisplay.includes(term);

      const matchesStatus =
        this.selectedStatus === 'All' || loan.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  openAddModal(): void {
    this.isAddModalOpen = true;
    this.newLoan = { pinNo: '', bookId: 0 };
    this.memberIsActive = false;
    this.canLoanBook = false;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
    this.newLoan = { pinNo: '', bookId: 0 };
    this.memberIsActive = false;
    this.canLoanBook = false;
  }

  onMemberChange(): void {
    const selectedMember = this.members.find(
      (m) => m.pin_no === this.newLoan.pinNo
    );
    this.memberIsActive = selectedMember?.status.toLowerCase() === 'active';
    this.updateAvailableBooks();
  }

  updateAvailableBooks(): void {
    // Books with available > 0
    this.availableBooks = this.books.filter((b) => b.available > 0);
    this.canLoanBook = this.availableBooks.some(
      (b) => b.id === this.newLoan.bookId && b.available > 0
    );
  }

  onBookChange(): void {
    this.canLoanBook =
      this.newLoan.bookId != null &&
      this.availableBooks.some((b) => b.id === this.newLoan.bookId);
  }

  submitLoan(): void {
    if (!this.memberIsActive) {
      alert('Selected member is not active and cannot borrow books.');
      return;
    }

    // Create loan data with dates
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 15);

    const loanToCreate: Loans = {
      loanId: 0, // backend assigns this
      pinNo: this.newLoan.pinNo!,
      bookId: this.newLoan.bookId!,
      issueDate: today.toISOString(),
      dueDate: dueDate.toISOString(),
      returnDate: null,
      status: 'ISSUED',
    };

    this.loanService.createLoan(loanToCreate).subscribe({
      next: (res) => {
        alert('Loan issued successfully!');
        this.isAddModalOpen = false;

        // Update book availability
        this.decreaseBookAvailability(loanToCreate.bookId);

        this.loadLoans();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to issue loan');
      },
    });
  }

  decreaseBookAvailability(bookId: number): void {
    const book = this.books.find((b) => b.id === bookId);
    if (book && book.available > 0) {
      book.available -= 1;
      this.bookService.update(book.id, book).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  increaseBookAvailability(bookId: number): void {
    const book = this.books.find((b) => b.id === bookId);
    if (book) {
      book.available += 1;
      this.bookService.update(book.id, book).subscribe(() => {
        this.loadBooks();
      });
    }
  }

  returnLoan(loan: Loans): void {
    if (!confirm('Mark this book as returned?')) {
      return;
    }

    const today = new Date();
    loan.returnDate = today.toISOString();
    loan.status = 'RETURNED';

    this.loanService.updateLoan(loan.loanId, loan).subscribe({
      next: () => {
        alert('Book returned successfully!');

        this.increaseBookAvailability(loan.bookId);
        this.loadLoans();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to return book');
      },
    });
  }

  getMemberName(pinNo: string): string {
    const mem = this.members.find((m) => m.pin_no === pinNo);
    return mem ? mem.name : 'Unknown Member';
  }

  getBookDisplay(bookId: number): string {
    const bk = this.books.find((b) => b.id === bookId);
    return bk ? `${bk.author} - ${bk.title}` : 'Unknown Book';
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
