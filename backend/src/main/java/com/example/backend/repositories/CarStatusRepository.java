package com.example.backend.repositories;

import com.example.backend.models.CarStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarStatusRepository extends JpaRepository<CarStatus, Integer> {
    List<CarStatus> findAll();
}
