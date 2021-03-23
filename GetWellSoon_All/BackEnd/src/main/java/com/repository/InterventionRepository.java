package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.model.Intervention;

@Repository
public interface InterventionRepository extends JpaRepository<Intervention, Integer> {

}
