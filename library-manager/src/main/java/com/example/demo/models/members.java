package com.example.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class members {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int admission_id;

    private String pin_no;
    private String name;
    private String degree;
    private String branch;
    private int year;
    private String status;

}
