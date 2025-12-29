package com.example.backend.services;

import com.example.backend.models.CarStatus;
import com.example.backend.repositories.CarStatusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarStatusService {
    private final CarStatusRepository carStatusRepository;

    public CarStatusService(CarStatusRepository carStatusRepository) {
        this.carStatusRepository = carStatusRepository;
    }

    public List<CarStatus> getAllCarStatuses() {
        return carStatusRepository.findAll();
    }
}