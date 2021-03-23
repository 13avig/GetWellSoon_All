package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Intervention;
import com.service.GetWellSoonService;

@RestController
@RequestMapping("/interventions")
@ComponentScan(basePackages = {"com.service"})
public class InterventionController {

	@Autowired
	private GetWellSoonService getWellSoonService;

	@RequestMapping(method = RequestMethod.GET, value = "/get")
	public List<Intervention> getAllInterventions() {
		return getWellSoonService.getAllInterventions();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/get/id/{interventionId}")
	public Intervention getIntervention(@PathVariable int interventionId) {
		return getWellSoonService.getIntervention(interventionId);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/add")
	public void addIntervention(@RequestBody Intervention intervention) { 
		getWellSoonService.addIntervention(intervention);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/update/id/{interventionId}")
	public void updateIntervention(@PathVariable int interventionId, @RequestBody Intervention intervention) { 
		getWellSoonService.updateIntervention(interventionId, intervention);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/id/{interventionId}")
	public void deleteIntervention(@PathVariable int interventionId) { // 
		getWellSoonService.deleteIntervention(interventionId);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete")
	public void deleteAllInterventions() {
		getWellSoonService.deleteAllInterventions();
	}
	
}