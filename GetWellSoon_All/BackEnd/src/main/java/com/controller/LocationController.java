package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.model.Location;
import com.service.GetWellSoonService;

@RestController
@RequestMapping("/locations")
@ComponentScan(basePackages = {"com.service"})
public class LocationController {

	@Autowired
	private GetWellSoonService getWellSoonService;

	@RequestMapping(method = RequestMethod.GET, value = "/get")
	public List<Location> getAllLocations() {
		return getWellSoonService.getAllLocations();
	}

	@RequestMapping(method = RequestMethod.GET, value = "/get/id/{locationId}")
	public Location getLocation(@PathVariable int locationId) {
		return getWellSoonService.getLocation(locationId);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/add")
	public void addLocation(@RequestBody Location location) { 
		getWellSoonService.addLocation(location);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/update/id/{locationId}")
	public void updateLocation(@PathVariable int locationId, @RequestBody Location location) { 
		getWellSoonService.updateLocation(locationId, location);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete/id/{locationId}")
	public void deleteLocation(@PathVariable int locationId) { // 
		getWellSoonService.deleteLocation(locationId);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/delete")
	public void deleteAllLocations() {
		getWellSoonService.deleteAllLocations();
	}
	
}