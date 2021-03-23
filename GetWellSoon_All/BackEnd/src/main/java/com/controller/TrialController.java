package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Trial;
import com.service.GetWellSoonService;

@RestController
@RequestMapping("/trials")
@ComponentScan(basePackages = {"com.service"})
public class TrialController {

	@Autowired
	private GetWellSoonService getWellSoonService;

	@RequestMapping(method = RequestMethod.GET, value = "/get")
	public List<Trial> getAllTrials() {
		return getWellSoonService.getAllTrials();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/get/id/{trialId}")
	public Trial getTrial(@PathVariable int trialId) {
		return getWellSoonService.getTrial(trialId);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/add")
	public void addTrial(@RequestBody Trial trial) { 
		getWellSoonService.addTrial(trial);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/update/id/{trialId}")
	public void updateTrial(@PathVariable int trialId, @RequestBody Trial trial) { 
		getWellSoonService.updateTrial(trialId, trial);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/id/{trialId}")
	public void deleteTrial(@PathVariable int trialId) { // 
		getWellSoonService.deleteTrial(trialId);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete")
	public void deleteAllTrials() {
		getWellSoonService.deleteAllTrials();
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/getBy/{condition}/{gender}/{age}/{location}")
	public List<Trial> getAllRelevantTrials(@PathVariable String condition, @PathVariable String gender, @PathVariable int age, @PathVariable String location) {
		return getWellSoonService.getAllRelevantTrials(condition, gender, age, location);
	}
	
}
