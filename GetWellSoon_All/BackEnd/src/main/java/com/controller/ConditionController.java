package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Condition;
import com.service.GetWellSoonService;

@RestController
@RequestMapping("/conditions")
@ComponentScan(basePackages = {"com.service"})
public class ConditionController {

	@Autowired
	private GetWellSoonService getWellSoonService;

	@RequestMapping(method = RequestMethod.GET, value = "/get")
	public List<Condition> getAllConditions() {
		return getWellSoonService.getAllConditions();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/get/id/{conditionId}")
	public Condition getCondition(@PathVariable int conditionId) {
		return getWellSoonService.getCondition(conditionId);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/add")
	public void addCondition(@RequestBody Condition condition) { 
		getWellSoonService.addCondition(condition);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/update/id/{conditionId}")
	public void updateCondition(@PathVariable int conditionId, @RequestBody Condition condition) { 
		getWellSoonService.updateCondition(conditionId, condition);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/id/{conditionId}")
	public void deleteCondition(@PathVariable int conditionId) { // 
		getWellSoonService.deleteCondition(conditionId);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete")
	public void deleteAllConditions() {
		getWellSoonService.deleteAllConditions();
	}
	
}
