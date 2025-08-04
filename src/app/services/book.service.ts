import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books$ = new BehaviorSubject<Book[]>([]);
  private dataUrl = 'http://localhost:8082/api/books';

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.http.get<Book[]>(this.dataUrl).subscribe((data) => {
      this.books$.next(data);
    });
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.dataUrl);
  }
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.dataUrl, book);
  }
  getBookById(id: number): Book | undefined {
    return this.books$.value.find((b) => b.id === id);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${this.dataUrl}/id/${id}`, data);
  }

  deleteBook(id: number): Observable<any> {
    const url = `${this.dataUrl}/id/${id}`;
    return this.http.delete(url);
  }

  filterBooksByCategory(category: string): void {
    this.http.get<Book[]>(this.dataUrl).pipe(
      map((books) =>
        category === 'All Categories'
          ? books
          : books.filter((book) => book.category === category)
      )
    ).subscribe(filtered => this.books$.next(filtered));
  }


}
