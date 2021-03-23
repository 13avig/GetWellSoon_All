package com.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name = "trials")
public class Trial {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int trialId;
	
	//private Date updatedOn;
	
	private String trialName;
	
	//private String trialType;
	
	//private int trialUniqueId;
	
	//private String trialSponsor;
	
	//private int trialParticipantCount;
	
	private int trialMaxAge;
	
	private int trialMinAge;
	
	private String trialGender;
	
	//private boolean isActive;
	
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE}, mappedBy = "trials")
	private List<Condition> conditions = new ArrayList<>();

	public Trial() {
		super();
	}

	public Trial(int trialId, Date updatedOn, String trialName, String trialType, int trialUniqueId, String trialSponsor, int trialParticipantCount, int trialMaxAge, int trialMinAge, String trialGender, boolean isActive, List<Condition> conditions) {
		super();
		this.trialId = trialId;
		//this.updatedOn = updatedOn;
		this.trialName = trialName;
		//this.trialType = trialType;
		//this.trialUniqueId = trialUniqueId;
		//this.trialSponsor = trialSponsor;
		//this.trialParticipantCount = trialParticipantCount;
		this.trialMaxAge = trialMaxAge;
		this.trialMinAge = trialMinAge;
		this.trialGender = trialGender;
		//this.isActive = isActive;
		this.conditions = conditions;
	}

	public int getTrialId() {
		return trialId;
	}

	public void setTrialId(int trialId) {
		this.trialId = trialId;
	}

	/*public Date getUpdatedOn() {
		return updatedOn;
	}

	public void setUpdatedOn(Date updatedOn) {
		this.updatedOn = updatedOn;
	}*/

	public String getTrialName() {
		return trialName;
	}

	public void setTrialName(String trialName) {
		this.trialName = trialName;
	}

	/*public String getTrialType() {
		return trialType;
	}

	public void setTrialType(String trialType) {
		this.trialType = trialType;
	}

	public int getTrialUniqueId() {
		return trialUniqueId;
	}

	public void setTrialUniqueId(int trialUniqueId) {
		this.trialUniqueId = trialUniqueId;
	}

	public String getTrialSponsor() {
		return trialSponsor;
	}

	public void setTrialSponsor(String trialSponsor) {
		this.trialSponsor = trialSponsor;
	}

	public int getTrialParticipantCount() {
		return trialParticipantCount;
	}

	public void setTrialParticipantCount(int trialParticipantCount) {
		this.trialParticipantCount = trialParticipantCount;
	}*/

	public int getTrialMaxAge() {
		return trialMaxAge;
	}

	public void setTrialMaxAge(int trialMaxAge) {
		this.trialMaxAge = trialMaxAge;
	}

	public int getTrialMinAge() {
		return trialMinAge;
	}

	public void setTrialMinAge(int trialMinAge) {
		this.trialMinAge = trialMinAge;
	}

	public String getTrialGender() {
		return trialGender;
	}

	public void setTrialGender(String trialGender) {
		this.trialGender = trialGender;
	}

	/*public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}*/

	public List<Condition> getConditions() {
		return conditions;
	}

	public void setConditions(List<Condition> conditions) {
		this.conditions = conditions;
	}
	
	
	
	
	
	
	
	
	
}
