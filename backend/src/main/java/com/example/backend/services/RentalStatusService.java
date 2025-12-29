package com.example.backend.services;

import com.example.backend.models.RentalStatus;
import com.example.backend.repositories.RentalStatusRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RentalStatusService {
    private final RentalStatusRepository rentalStatusRepository;

    public RentalStatusService(RentalStatusRepository rentalStatusRepository) {
        this.rentalStatusRepository = rentalStatusRepository;
    }

    public List<RentalStatus> getAllRentalStatuses() {
        return rentalStatusRepository.findAll();
    }

    @PostConstruct
    public void initRentalStatuses() {
        if (rentalStatusRepository.count() == 0) {
            saveStatus("ACTIVE");
            saveStatus("COMPLETED");
            saveStatus("CANCELLED");
        }
    }

    private void saveStatus(String statusName) {
        RentalStatus status = new RentalStatus();
        status.setStatus(statusName);
        rentalStatusRepository.save(status);
    }
}