package com.example.backend.controllers;

import com.example.backend.models.CarStatus;
import com.example.backend.services.CarStatusService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/car-statuses")
@CrossOrigin(origins = "http://localhost:5173")
public class CarStatusController {
    private final CarStatusService carStatusService;

    public CarStatusController(CarStatusService carStatusService) {
        this.carStatusService = carStatusService;
    }

    @GetMapping("/all")
    public List<CarStatus> getAllCarStatuses() {
        return carStatusService.getAllCarStatuses();
    }
}