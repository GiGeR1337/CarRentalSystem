package com.example.backend.controllers;

import com.example.backend.dtos.LocationDTO;
import com.example.backend.models.Location;
import com.example.backend.services.LocationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "http://localhost:5173")
public class LocationController {
    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/all")
    public List<Location> getAllLocations() {
        return locationService.getAllLocations();
    }

    @GetMapping("/{id}")
    public Location getLocationById(@PathVariable Integer id) {
        return locationService.getLocationById(id);
    }

    @PostMapping("/create")
    public Location createLocation(@Valid @RequestBody LocationDTO locationDTO) {
        return locationService.createLocation(locationDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteLocation(@PathVariable Integer id) {
        locationService.deleteLocation(id);
    }
}