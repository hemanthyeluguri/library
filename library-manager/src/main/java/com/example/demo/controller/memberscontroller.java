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

import com.example.demo.models.members;
import com.example.demo.services.membersservice;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/members")
public class memberscontroller {
	 @Autowired
	    private membersservice memberService;

	    @PostMapping
	    public members add(@RequestBody members member) {
	    	member.setAdmission_id(0);
	        return memberService.createBook(member);
	    }

	    @GetMapping
	    public List<members> all() {
	        return memberService.getAllBooks();
	    }

	    @PatchMapping("/admission_id/{id}")
	    public members update(@PathVariable int id, @RequestBody members book) {
	        return memberService.updateBook(id, book);
	    }

	    @DeleteMapping("/admission_id/{id}")
	    public void delete(@PathVariable int id) {
	        memberService.deleteBook(id);
	    }

}

   