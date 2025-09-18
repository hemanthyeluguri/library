package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.books;
import com.example.demo.services.booksservice;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/books")
public class bookscontroller {

    @Autowired
    private booksservice bookService;

    @PostMapping
    public books add(@RequestBody books book) {
    	book.setId(0);
        return bookService.createBook(book);
    }

    @GetMapping
    public List<books> all() {
        return bookService.getAllBooks();
    }

    @PatchMapping("/id/{id}")
    public books update(@PathVariable int id, @RequestBody books book) {
        return bookService.updateBook(id, book);
    }

    @DeleteMapping("/id/{id}")
    public void delete(@PathVariable int id) {
        bookService.deleteBook(id);
    }
}