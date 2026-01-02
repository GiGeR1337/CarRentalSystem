package com.example.backend.controllers;

import com.example.backend.dtos.RentalDTO;
import com.example.backend.models.Rental;
import com.example.backend.services.RentalService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {
    private final RentalService rentalService;

    public RentalController(RentalService rentalService) {
        this.rentalService = rentalService;
    }

    @GetMapping("/car/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Rental> getAllRentalsByIdCar(@PathVariable Integer id){
        return rentalService.getAllRentalsByIdCar(id);
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Rental> getAllRentalsByIdUser(@PathVariable Integer id){
        return rentalService.getAllRentalsByIdUser(id);
    }

    @GetMapping("/my-history")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public List<Rental> getMyRentals(Authentication authentication){
        String email = authentication.getName();
        Integer userId = rentalService.getUserIdByEmail(email);
        return rentalService.getAllRentalsByIdUser(userId);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public void rentCar(@RequestBody RentalDTO rentalDTO, Authentication authentication) {
        String userEmail = authentication.getName();

        rentalService.createRental(rentalDTO, userEmail);
    }

    @PutMapping("/cancel/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public void cancelRental(@PathVariable Integer id, Authentication authentication) {
        rentalService.cancelRental(id, authentication.getName());
    }

    @PutMapping("/my-update/{id}")
    @PreAuthorize("hasRole('USER')")
    public void updateMyRental(@PathVariable Integer id, @RequestBody RentalDTO rentalDTO, Authentication authentication) {
        rentalService.updateMyRental(id, rentalDTO, authentication.getName());
    }
}