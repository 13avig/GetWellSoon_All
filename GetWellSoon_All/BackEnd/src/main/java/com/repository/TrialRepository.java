package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Trial;

@Repository
public interface TrialRepository extends JpaRepository<Trial, Integer> {

}
