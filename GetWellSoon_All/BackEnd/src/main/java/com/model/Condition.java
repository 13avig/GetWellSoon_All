package com.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "conditions")
public class Condition{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int conditionId;
	
	private String conditionName;

	@JsonBackReference
	@ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	@JoinTable(name = "trials_conditions", joinColumns = {@JoinColumn(name = "conditionId")}, inverseJoinColumns = {@JoinColumn(name = "trialId")})
	private List<Trial> trials = new ArrayList<>();
	
	public Condition() {
		super();
	}
	
	public Condition(int conditionId, String conditionName) {
		super();
		this.conditionId = conditionId;
		this.conditionName = conditionName;
	}

	public int getConditionId() {
		return conditionId;
	}

	public void setConditionId(int conditionId) {
		this.conditionId = conditionId;
	}

	public String getConditionName() {
		return conditionName;
	}

	public void setConditionName(String conditionName) {
		this.conditionName = conditionName;
	}

	public List<Trial> getTrials() {
		return trials;
	}

	public void setTrials(List<Trial> trials) {
		this.trials = trials;
	}
}
