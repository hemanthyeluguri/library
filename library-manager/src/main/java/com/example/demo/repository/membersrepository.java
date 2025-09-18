package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.members;

@Repository
public interface membersrepository extends JpaRepository<members, Integer> {
	
}
