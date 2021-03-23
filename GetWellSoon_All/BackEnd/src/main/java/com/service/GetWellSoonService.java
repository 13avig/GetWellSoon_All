package com.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Condition;
import com.model.Hospital;
import com.model.Intervention;
import com.model.Location;
import com.model.Patient;
import com.model.Trial;
import com.repository.ConditionRepository;
import com.repository.HospitalRepository;
import com.repository.InterventionRepository;
import com.repository.LocationRepository;
import com.repository.PatientRepository;
import com.repository.TrialRepository;

@Service
public class GetWellSoonService {

	@Autowired
	private ConditionRepository conditionRepository;

	public List<Condition> getAllConditions() {
		return (List<Condition>) conditionRepository.findAll();
	}

	public Condition getCondition(int conditionId) {
		return conditionRepository.findById(conditionId).get();
	}

	public void addCondition(Condition condition) {
		conditionRepository.save(condition);
	}
	
	public void updateCondition(int conditionId, Condition condition) {
		conditionRepository.save(condition);
	}

	public void deleteCondition(int id) {
		conditionRepository.deleteById(id);
	}

	public void deleteAllConditions() {
		conditionRepository.deleteAll();
	}
	
	@Autowired
	private HospitalRepository hospitalRepository;

	public List<Hospital> getAllHospitals() {
		return (List<Hospital>) hospitalRepository.findAll();
	}

	public Hospital getHospital(int hospitalId) {
		return hospitalRepository.findById(hospitalId).get();
	}

	public void addHospital(Hospital hospital) {
		hospitalRepository.save(hospital);
	}
	
	public void updateHospital(int hospitalId, Hospital hospital) {
		hospitalRepository.save(hospital);
	}

	public void deleteHospital(int id) {
		hospitalRepository.deleteById(id);
	}

	public void deleteAllHospitals() {
		hospitalRepository.deleteAll();
	}
	
	@Autowired
	private InterventionRepository interventionRepository;

	public List<Intervention> getAllInterventions() {
		return (List<Intervention>) interventionRepository.findAll();
	}

	public Intervention getIntervention(int interventionId) {
		return interventionRepository.findById(interventionId).get();
	}

	public void addIntervention(Intervention intervention) {
		interventionRepository.save(intervention);
	}
	
	public void updateIntervention(int interventionId, Intervention intervention) {
		interventionRepository.save(intervention);
	}

	public void deleteIntervention(int id) {
		interventionRepository.deleteById(id);
	}

	public void deleteAllInterventions() {
		interventionRepository.deleteAll();
	}
	
	@Autowired
	private LocationRepository locationRepository;

	public List<Location> getAllLocations() {
		return (List<Location>) locationRepository.findAll();
	}

	public Location getLocation(int locationId) {
		return locationRepository.findById(locationId).get();
	}

	public void addLocation(Location location) {
		locationRepository.save(location);
	}
	
	public void updateLocation(int locationId, Location location) {
		locationRepository.save(location);
	}

	public void deleteLocation(int id) {
		locationRepository.deleteById(id);
	}

	public void deleteAllLocations() {
		locationRepository.deleteAll();
	}
	
	@Autowired
	private PatientRepository patientRepository;

	public List<Patient> getAllPatients() {
		return (List<Patient>) patientRepository.findAll();
	}

	public Patient getPatient(int patientId) {
		return patientRepository.findById(patientId).get();
	}

	public void addPatient(Patient patient) {
		patientRepository.save(patient);
	}
	
	public void updatePatient(int patientId, Patient patient) {
		patientRepository.save(patient);
	}

	public void deletePatient(int id) {
		patientRepository.deleteById(id);
	}

	public void deleteAllPatients() {
		patientRepository.deleteAll();
	}
	
	@Autowired
	private TrialRepository trialRepository;

	public List<Trial> getAllTrials() {
		return (List<Trial>) trialRepository.findAll();
	}

	public Trial getTrial(int trialId) {
		return trialRepository.findById(trialId).get();
	}

	public void addTrial(Trial trial) {
		List<Condition> lsConditions = trial.getConditions();
		for(Condition condition : lsConditions ) {
			List<Trial> lsTrials = condition.getTrials();
			lsTrials.add(trial);
			condition.setTrials(lsTrials);
		}
		trialRepository.save(trial);
	}
	
	public void updateTrial(int trialId, Trial trial) {
		trialRepository.save(trial);
	}

	public void deleteTrial(int id) {
		trialRepository.deleteById(id);
	}

	public void deleteAllTrials() {
		trialRepository.deleteAll();
	}
	
	//trial matching
	
	public boolean doesConditionMatch(Trial trial, String condition) {
		List<Condition> conditions = trial.getConditions();
		for(int x = 0; x < conditions.size(); x++) {
			String cName = conditions.get(x).getConditionName();
			if(cName.equals(condition)) {
				return true;
			}
		}
		return false;
	}
	
	public boolean doesGenderMatch(Trial trial, String gender) {
		String trialGender = trial.getTrialGender();
		return (trialGender.equals("B") || trialGender.equals(gender));
	}
	
	public boolean doesAgeMatch(Trial trial, int age) {
		int trialMaxAge = trial.getTrialMaxAge();
		int trialMinAge = trial.getTrialMinAge();
		return (age <= trialMaxAge && age >= trialMinAge);
	}
	
	//not functional
	public List<Trial> sortTrialsByLocation(List<Trial> trials, String location) {
		return trials;
	}
	
	public List<Trial> getAllRelevantTrials(String condition, String gender, int age, String location) {
		List<Trial> trials = getAllTrials();
		List<Trial> relevantTrials = new ArrayList<Trial>();
		for(int x = 0; x < trials.size(); x++)
		{
			Trial t = trials.get(x);
			if(doesConditionMatch(t, condition) && doesGenderMatch(t, gender) && doesAgeMatch(t, age))
			{
				relevantTrials.add(t);
			}
		}
		relevantTrials = sortTrialsByLocation(relevantTrials, location);
		return relevantTrials;
	}
	
}
