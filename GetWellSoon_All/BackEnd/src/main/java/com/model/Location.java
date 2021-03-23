package com.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "locations")
public class Location {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int locationId;
	private String locationName;
	private String locationStreetAddress;
	private String locationCity;
	private String locationState;
	private String locationCountry;
	private long locationZip;
	private String locationContact;
	private long locationPhone;
}
