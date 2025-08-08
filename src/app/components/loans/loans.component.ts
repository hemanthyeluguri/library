import { Component } from '@angular/core';
// import { Book } from 'src/app/models/book.model';
// import { Member } from 'src/app/models/members.model';
// import { LoansService } from 'src/app/services/loans.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent {
//   books: Book[] = [];
//   members: Member[] = [];

//   selectedBookId: number | null = null;
//   selectedMemberId: number | null = null;

//   message: string = '';

//   constructor(private service: LoansService) {}

//   ngOnInit(): void {
//     this.books = this.service.getBooks();
//     this.members = this.service.getMembers();
//   }

//   loanBook(): void {
//     if (this.selectedBookId == null || this.selectedMemberId == null) {
//       this.message = 'Please select both a book and a member.';
//       return;
//     }

//     this.message = this.service.loanBook(this.selectedMemberId, this.selectedBookId);
//   }

}
