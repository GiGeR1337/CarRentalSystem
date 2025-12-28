package com.example.backend.repositories;

import com.example.backend.models.RentalStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalStatusRepository extends JpaRepository<RentalStatus, Integer> {
    List<RentalStatus> findAll();
}
