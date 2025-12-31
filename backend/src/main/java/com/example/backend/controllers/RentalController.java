package com.example.backend.controllers;

import com.example.backend.dtos.RentalDTO;
import com.example.backend.services.RentalService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {
    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void rentCar(@RequestBody RentalDTO rentalDTO, Authentication authentication) {
        String userEmail = authentication.getName();

        rentalService.createRental(rentalDTO, userEmail);
    }
}