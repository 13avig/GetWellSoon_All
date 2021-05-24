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
	private int id;
	
	private Date createdAt;
	private Date processedAt;
	
	private Date firstPosted;
	private Date lastUpdated;
	private Date studyStart;
	private Date studyCompletion;
	private List<String> primaryOutcomes = new ArrayList<>();
	private List<String> secondaryOutcomes = new ArrayList<>();
	private String briefTitle;
	private String officialTitle;
	private String briefSummary;
	private String detailedDescription;
	private String studyType;
	private String studyPhase;
	private String studyDesign;
	private List<String> conditions = new ArrayList<>();
	private List<String> interventions = new ArrayList<>();
	private List<String> publications = new ArrayList<>();
	private String enrollmentStatus;
	private int enrollmentCount;
	private List<String> inclusionCriteria = new ArrayList<>();
	private List<String> exclusionCriteria = new ArrayList<>();
	private String gender;
	private int minAge;
	private int maxAge;
	private List<String> contacts = new ArrayList<>();
	private List<String> locationCountries = new ArrayList<>();
	private String nctId;
	private List<String> studyIdNumbers;
	private String responsibleParty;
	private String sponsor;
	private List<String> collaborators = new ArrayList<>();
	private List<String> investigators = new ArrayList<>();
	
	public Trial() {
		super();
	}

	public Trial(int id, Date createdAt, Date processedAt, Date firstPosted, Date lastUpdated, Date studyStart, Date studyCompletion, List<String> primaryOutcomes, List<String> secondaryOutcomes, String briefTitle, String officialTitle, String briefSummary, String detailedDescription, String studyType, String studyPhase, String studyDesign, List<String> conditions, List<String> interventions, List<String> publications, String enrollmentStatus, int enrollmentCount, List<String> inclusionCriteria, List<String> exclusionCriteria, String gender, int minAge, int maxAge, List<String> contacts, List<String> locationCountries, String nctId, List<String> studyIdNumbers, String responsibleParty, String sponsor, List<String> collaborators, List<String> investigators) {
		super();
		this.id = id;
		this.createdAt = createdAt;
		this.processedAt = processedAt;
		this.firstPosted = firstPosted;
		this.lastUpdated = lastUpdated;
		this.studyStart = studyStart;
		this.studyCompletion = studyCompletion;
		this.primaryOutcomes = primaryOutcomes;
		this.secondaryOutcomes = secondaryOutcomes;
		this.briefTitle = briefTitle;
		this.officialTitle = officialTitle;
		this.briefSummary = briefSummary;
		this.detailedDescription = detailedDescription;
		this.studyType = studyType;
		this.studyPhase = studyPhase;
		this.studyDesign = studyDesign;
		this.conditions = conditions;
		this.interventions = interventions;
		this.publications = publications;
		this.enrollmentStatus = enrollmentStatus;
		this.enrollmentCount = enrollmentCount;
		this.inclusionCriteria = inclusionCriteria;
		this.exclusionCriteria = exclusionCriteria;
		this.gender = gender;
		this.minAge = minAge;
		this.maxAge = maxAge;
		this.contacts = contacts;
		this.locationCountries = locationCountries;
		this.nctId = nctId;
		this.studyIdNumbers = studyIdNumbers;
		this.responsibleParty = responsibleParty;
		this.sponsor = sponsor;
		this.collaborators = collaborators;
		this.investigators = investigators;
	}

	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public Date getCreatedAt() {
		return createdAt;
	}
	
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	
	public Date getProcessedAt() {
		return processedAt;
	}
	
	public void setProcessedAt(Date processedAt) {
		this.processedAt = processedAt;
	}
	
	public Date getFirstPosted() {
		return firstPosted;
	}
	
	public void setFirstPosted(Date firstPosted) {
		this.firstPosted = firstPosted;
	}
	
	public Date getLastUpdated() {
		return lastUpdated;
	}
	
	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}
	
	public Date getStudyStart() {
		return studyStart;
	}
	
	public void setStudyStart(Date studyStart) {
		this.studyStart = studyStart;
	}
	
	public Date getStudyCompletion() {
		return studyCompletion;
	}
	
	public void setStudyCompletion(Date studyCompletion) {
		this.studyCompletion = studyCompletion;
	}
	
	public List<String> getPrimaryOutcomes() {
		return primaryOutcomes;
	}
	
	public void setPrimaryOutcomes(List<String> primaryOutcomes) {
		this.primaryOutcomes = primaryOutcomes;
	}
	
	public List<String> getSecondaryOutcomes() {
		return secondaryOutcomes;
	}
	
	public void setSecondaryOutcomes(List<String> secondaryOutcomes) {
		this.secondaryOutcomes = secondaryOutcomes;
	}
	
	public String getBriefTitle() {
		return briefTitle;
	}
	
	public void setBriefTitle(String briefTitle) {
		this.briefTitle = briefTitle;
	}
	
	public String getOfficialTitle() {
		return officialTitle;
	}
	
	public void setOfficialTitle(String officialTitle) {
		this.officialTitle = officialTitle;
	}
	
	public String getBriefSummary() {
		return briefSummary;
	}
	
	public void setBriefSummary(String briefSummary) {
		this.briefSummary = briefSummary;
	}
	
	public String getDetailedDescription() {
		return detailedDescription;
	}
	
	public void setDetailedDescription(String detailedDescription) {
		this.detailedDescription = detailedDescription;
	}
	
	public String getStudyType() {
		return studyType;
	}
	
	public void setStudyType(String studyType) {
		this.studyType = studyType;
	}
	
	public String getStudyPhase() {
		return studyPhase;
	}
	
	public void setStudyPhase(String studyPhase) {
		this.studyPhase = studyPhase;
	}
	
	public String getStudyDesign() {
		return studyDesign;
	}
	
	public void setStudyDesign(String studyDesign) {
		this.studyDesign = studyDesign;
	}
	
	public List<String> getConditions() {
		return conditions;
	}
	
	public void setConditions(List<String> conditions) {
		this.conditions = conditions;
	}
	
	public List<String> getInterventions() {
		return interventions;
	}
	
	public void setInterventions(List<String> interventions) {
		this.interventions = interventions;
	}
	
	public List<String> getPublications() {
		return publications;
	}
	
	public void setPublications(List<String> publications) {
		this.publications = publications;
	}
	
	public String getEnrollmentStatus() {
		return enrollmentStatus;
	}
	
	public void setEnrollmentStatus(String enrollmentStatus) {
		this.enrollmentStatus = enrollmentStatus;
	}
	
	public int getEnrollmentCount() {
		return enrollmentCount;
	}
	
	public void setEnrollmentCount(int enrollmentCount) {
		this.enrollmentCount = enrollmentCount;
	}
	
	public List<String> getInclusionCriteria() {
		return inclusionCriteria;
	}
	
	public void setInclusionCriteria(List<String> inclusionCriteria) {
		this.inclusionCriteria = inclusionCriteria;
	}
	
	public List<String> getExclusionCriteria() {
		return exclusionCriteria;
	}
	
	public void setExclusionCriteria(List<String> exclusionCriteria) {
		this.exclusionCriteria = exclusionCriteria;
	}
	
	public String getGender() {
		return gender;
	}
	
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	public int getMinAge() {
		return minAge;
	}
	
	public void setMinAge(int minAge) {
		this.minAge = minAge;
	}
	
	public int getMaxAge() {
		return maxAge;
	}
	
	public void setMaxAge(int maxAge) {
		this.maxAge = maxAge;
	}
	
	public List<String> getContacts() {
		return contacts;
	}
	
	public void setContacts(List<String> contacts) {
		this.contacts = contacts;
	}
	
	public List<String> getLocationCountries() {
		return locationCountries;
	}
	
	public void setLocationCountries(List<String> locationCountries) {
		this.locationCountries = locationCountries;
	}
	
	public String getNctId() {
		return nctId;
	}
	
	public void setNctId(String nctId) {
		this.nctId = nctId;
	}
	
	public List<String> getStudyIdNumbers() {
		return studyIdNumbers;
	}
	
	public void setStudyIdNumbers(List<String> studyIdNumbers) {
		this.studyIdNumbers = studyIdNumbers;
	}
	
	public String getResponsibleParty() {
		return responsibleParty;
	}
	
	public void setResponsibleParty(String responsibleParty) {
		this.responsibleParty = responsibleParty;
	}
	
	public String getSponsor() {
		return sponsor;
	}
	
	public void setSponsor(String sponsor) {
		this.sponsor = sponsor;
	}
	
	public List<String> getCollaborators() {
		return collaborators;
	}
	
	public void setCollaborators(List<String> collaborators) {
		this.collaborators = collaborators;
	}
	
	public List<String> getInvestigators() {
		return investigators;
	}
	
	public void setInvestigators(List<String> investigators) {
		this.investigators = investigators;
	}

}
