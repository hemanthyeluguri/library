package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.loans;
import com.example.demo.services.loansservice;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin(origins = "http://localhost:4200")
public class loanscontroller {

    @Autowired
    private loansservice loansService;

    @PostMapping
    public loans addLoan(@RequestBody loans loan) {
        return loansService.saveLoan(loan);
    }

    @GetMapping
    public List<loans> getAllLoans() {
        return loansService.getAllLoans();
    }

    @GetMapping("/member/{pinNo}")
    public List<loans> getLoansByPinNo(@PathVariable String pinNo) {
        return loansService.getLoansByPinNo(pinNo);
    }

    @PutMapping("/update/{loan_id}")
    public loans updateLoan(@RequestBody loans loan, @PathVariable("loan_id") int loan_id) {
        return loansService.updateLoan(loan_id, loan);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteLoan(@PathVariable int id) {
        loansService.deleteLoanById(id);
    }
}