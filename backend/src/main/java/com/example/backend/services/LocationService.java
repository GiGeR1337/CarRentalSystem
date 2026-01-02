package com.example.backend.services;

import com.example.backend.dtos.LocationDTO;
import com.example.backend.models.Location;
import com.example.backend.repositories.LocationRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LocationService {
    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location getLocationById(Integer id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found"));
    }

    public Location createLocation(LocationDTO locationDTO) {
        Location location = new Location();

        location.setAddress(locationDTO.getAddress());
        location.setCity(locationDTO.getCity());

        return locationRepository.save(location);
    }

    public void deleteLocation(Integer id) {
        locationRepository.deleteById(id);
    }

    @PostConstruct
    public void initLocations() {
        if (locationRepository.count() == 0) {
            saveLocation("Warsaw", "Mortgage Street");
            saveLocation("Warsaw", "Royal Street");
            saveLocation("Warsaw", "New World Street");
            saveLocation("Krakow", "Kanonicza Street");
            saveLocation("Krakow", "Florianska Street");
            saveLocation("Krakow", "Grodzka Street");
        }
    }

    private void saveLocation(String city, String address) {
        Location loc = new Location();
        loc.setCity(city);
        loc.setAddress(address);
        locationRepository.save(loc);
    }

    public Location updateLocation(Integer id, LocationDTO locationDTO) {
        Location location = getLocationById(id);

        location.setCity(locationDTO.getCity());
        location.setAddress(locationDTO.getAddress());

        return locationRepository.save(location);
    }
}