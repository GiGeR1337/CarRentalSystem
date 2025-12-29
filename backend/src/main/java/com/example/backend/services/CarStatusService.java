package com.example.backend.services;

import com.example.backend.models.CarStatus;
import com.example.backend.repositories.CarStatusRepository;
import jakarta.annotation.PostConstruct;
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

    @PostConstruct
    public void initCarStatuses() {
        if (carStatusRepository.count() == 0) {
            saveStatus("AVAILABLE");
            saveStatus("RENTED");
            saveStatus("UNAVAILABLE");
        }
    }

    private void saveStatus(String statusName) {
        CarStatus status = new CarStatus();
        status.setStatus(statusName);
        carStatusRepository.save(status);
    }
}