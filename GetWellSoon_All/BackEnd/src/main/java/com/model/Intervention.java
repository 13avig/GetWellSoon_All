package com.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "interventions")
public class Intervention {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int interventionId;
	private String interventionName;
}
