package com.example.demo.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class loans {
	
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loanId;
    
    @Column(name = "pin_no")
    private String pinNo;
    private int bookId;

    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;

    private String status;


}