package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Patient;
import com.service.GetWellSoonService;

@RestController
@RequestMapping("/patients")
@ComponentScan(basePackages = {"com.service"})
public class PatientController {

	@Autowired
	private GetWellSoonService getWellSoonService;

	@RequestMapping(method = RequestMethod.GET, value = "/get")
	public List<Patient> getAllPatients() {
		return getWellSoonService.getAllPatients();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/get/id/{patientId}")
	public Patient getPatient(@PathVariable int patientId) {
		return getWellSoonService.getPatient(patientId);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/add")
	public void addPatient(@RequestBody Patient patient) { 
		getWellSoonService.addPatient(patient);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/update/id/{patientId}")
	public void updatePatient(@PathVariable int patientId, @RequestBody Patient patient) { 
		getWellSoonService.updatePatient(patientId, patient);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/id/{patientId}")
	public void deletePatient(@PathVariable int patientId) { // 
		getWellSoonService.deletePatient(patientId);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete")
	public void deleteAllPatients() {
		getWellSoonService.deleteAllPatients();
	}
	
}
