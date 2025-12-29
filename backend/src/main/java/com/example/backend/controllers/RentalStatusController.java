package com.example.backend.controllers;

import com.example.backend.models.RentalStatus;
import com.example.backend.services.RentalStatusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rental-statuses")
@CrossOrigin(origins = "http://localhost:5173")
public class RentalStatusController {
    private final RentalStatusService rentalStatusService;

    public RentalStatusController(RentalStatusService rentalStatusService) {
        this.rentalStatusService = rentalStatusService;
    }

    @GetMapping("/all")
    public List<RentalStatus> getAllRentalStatuses() {
        return rentalStatusService.getAllRentalStatuses();
    }
}