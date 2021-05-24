package com.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Trial;
import com.repository.TrialRepository;

@Service
public class GetWellSoonService {

	@Autowired
	private TrialRepository trialRepository;

	public List<Trial> getAllTrials() {
		return (List<Trial>) trialRepository.findAll();
	}

	public Trial getTrial(int trialId) {
		return trialRepository.findById(trialId).get();
	}

	public void addTrial(Trial trial) {
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
	
}
