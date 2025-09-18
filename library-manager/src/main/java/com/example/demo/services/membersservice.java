package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.members;
import com.example.demo.repository.membersrepository;

@Service
public class membersservice {
	
	@Autowired
    private membersrepository membersrepo;

    public members createBook(members member) {
        return membersrepo.save(member);
    }

    public List<members> getAllBooks() {
        return membersrepo.findAll();
    }

    public members updateBook(int addmission_id, members member) {
        members m = membersrepo.findById(addmission_id).orElseThrow();
        m.setName(member.getName());
        m.setPin_no(member.getPin_no());
        m.setDegree(member.getDegree());
        m.setBranch(member.getBranch());
        m.setYear(member.getYear());
        m.setStatus(member.getStatus());
        return membersrepo.save(m);
    }

    public void deleteBook(int addmission_id) {
        membersrepo.deleteById(addmission_id);
    }
}
