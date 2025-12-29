package com.example.backend.services;

import com.example.backend.models.Location;
import com.example.backend.repositories.LocationRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

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
        return locationRepository.findById(id).orElse(null);
    }

    public Location saveLocation(Location location) {
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
}