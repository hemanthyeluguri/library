package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.books;
import com.example.demo.repository.booksrepository;

import java.util.List;

@Service
public class booksservice {
    @Autowired
    private booksrepository booksrepo;

    public books createBook(books book) {
        return booksrepo.save(book);
    }

    public List<books> getAllBooks() {
        return booksrepo.findAll();
    }

    public books updateBook(int id, books book) {
        books b = booksrepo.findById(id).orElseThrow();
        b.setTitle(book.getTitle());
        b.setAuthor(book.getAuthor());
        b.setCategory(book.getCategory());
        b.setIsbn(book.getIsbn());
        b.setTotalbooks(book.getTotalbooks());
        b.setAvailable(book.getAvailable());
        return booksrepo.save(b);
    }

    public void deleteBook(int id) {
        booksrepo.deleteById(id);
    }
}
