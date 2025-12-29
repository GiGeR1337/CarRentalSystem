package com.example.backend.services;

import com.example.backend.models.RentalStatus;
import com.example.backend.repositories.RentalStatusRepository;
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
}