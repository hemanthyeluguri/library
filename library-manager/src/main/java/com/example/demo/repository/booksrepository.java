package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.books;

@Repository
public interface booksrepository extends JpaRepository<books, Integer> {

}
