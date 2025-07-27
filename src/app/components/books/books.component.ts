import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm = '';
  selectedCategory = 'All Categories';
  categories = ['All Categories', 'Fiction', 'Academic', 'Children', 'Non‑Fiction'];
  page: number = 1;
  editingBook: Book | null = null;
  isEditModalOpen = false;
  editIndex: number | null = null;

  // add book
  
  showAddForm = false;
  newBook: Book = {
    id: 0,
    title: '',
    author: '',
    category: '',
    isbn: '',
    totalbooks: 0,
    available: 0
  };

  @ViewChild('top') topElement!: ElementRef;

  @Input() editedBook: Book = {
    id: 0,
    title: '',
    author: '',
    category: '',
    isbn: '',
    totalbooks: 0,
    available: 0
  }
    message: '' | undefined;
  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) { }

 
  ngOnInit(): void {
    this.loadBooks();

  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.applyFilters();
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.bookService.filterBooksByCategory(this.selectedCategory);
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term) ||
      book.category.toLowerCase().includes(term)
    );
  }
  updateBook(): void {
    this.message = '';

    this.bookService
      .update(this.editedBook.id, this.editedBook)
      .subscribe({
        
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This data was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
   // add book

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  scrollToTop() {
    setTimeout(() => {
      this.topElement?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  submitForm() {
    this.newBook.available = this.newBook.totalbooks;
    this.bookService.addBook(this.newBook).subscribe({
      next: (data) => {
        alert('Book added successfully!');
        this.newBook = {
          id: 0,
          title: '',
          author: '',
          category: '',
          isbn: '',
          totalbooks: 0,
          available: 0
        };
        this.showAddForm = false;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to add book');
      }
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.books = this.books.filter(book => {
          return book.id !== id;
        });
        this.applyFilters();
      });
    }
  }

  openEditModal(index: number): void {
    this.editIndex = index;
    this.editedBook = { ...this.books[index] }; // Copy data
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.editedBook = {} as Book;
  }

  cancelEdit() {
    this.editingBook = null;
  }

}
