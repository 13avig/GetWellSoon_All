package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Hospital;
import com.service.GetWellSoonService;

@RestController
@RequestMapping("/hospitals")
@ComponentScan(basePackages = {"com.service"})
public class HospitalController {

	@Autowired
	private GetWellSoonService getWellSoonService;

	@RequestMapping(method = RequestMethod.GET, value = "/get")
	public List<Hospital> getAllHospitals() {
		return getWellSoonService.getAllHospitals();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/get/id/{hospitalId}")
	public Hospital getHospital(@PathVariable int hospitalId) {
		return getWellSoonService.getHospital(hospitalId);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/add")
	public void addHospital(@RequestBody Hospital hospital) { 
		getWellSoonService.addHospital(hospital);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/update/id/{hospitalId}")
	public void updateHospital(@PathVariable int hospitalId, @RequestBody Hospital hospital) { 
		getWellSoonService.updateHospital(hospitalId, hospital);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/id/{hospitalId}")
	public void deleteHospital(@PathVariable int hospitalId) { // 
		getWellSoonService.deleteHospital(hospitalId);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete")
	public void deleteAllHospitals() {
		getWellSoonService.deleteAllHospitals();
	}
	
}