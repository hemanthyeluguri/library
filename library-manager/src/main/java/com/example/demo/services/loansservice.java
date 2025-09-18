package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.loans;
import com.example.demo.repository.loansrepository;

import java.util.List;

@Service
public class loansservice {

    @Autowired
    private loansrepository loansrepo;

    public loans saveLoan(loans loan) {
        return loansrepo.save(loan);
    }

    public List<loans> getAllLoans() {
        return loansrepo.findAll();
    }

    public List<loans> getLoansByPinNo(String pinNo) {
        return loansrepo.findByPinNo(pinNo);
    }

    public void deleteLoanById(int id) {
        loansrepo.deleteById(id);
    }
    public loans updateLoan(int loan_id, loans loan) {
        loans l = loansrepo.findById(loan_id).orElseThrow();

        // Consider null checks to avoid overwriting with nulls
        if (loan.getPinNo() != null) l.setPinNo(loan.getPinNo());
        if (loan.getBookId() != 0) l.setBookId(loan.getBookId()); // handle carefully
        if (loan.getIssueDate() != null) l.setIssueDate(loan.getIssueDate());
        if (loan.getReturnDate() != null) l.setReturnDate(loan.getReturnDate());
        if (loan.getStatus() != null) l.setStatus(loan.getStatus());

        return loansrepo.save(l); 
    }
}