package com.example.backend.services;

import com.example.backend.dtos.CarDTO;
import com.example.backend.models.Car;
import com.example.backend.models.CarStatus;
import com.example.backend.models.Location;
import com.example.backend.repositories.CarRepository;
import com.example.backend.repositories.CarStatusRepository;
import com.example.backend.repositories.LocationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {
    private final CarRepository carRepository;
    private final LocationRepository locationRepository;
    private final CarStatusRepository carStatusRepository;

    public CarService(CarRepository carRepository, LocationRepository locationRepository, CarStatusRepository carStatusRepository) {
        this.carRepository = carRepository;
        this.locationRepository = locationRepository;
        this.carStatusRepository = carStatusRepository;
    }

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public List<Car> getAllCarsInCity(String city){
        return carRepository.findAllByLocation_City(city);
    }

    public Car getCarById(Integer id){
        return carRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));
    }

    public void createCar(CarDTO dto) {
        Car car = new Car();
        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setPrice(dto.getPrice());
        car.setYear(dto.getYear());

        CarStatus status = carStatusRepository.findById(dto.getIdStatus())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status not found"));

        Location location = locationRepository.findById(dto.getIdLocation())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found"));

        car.setCarStatus(status);
        car.setLocation(location);

        carRepository.save(car);
    }

    public void deleteCar(Integer id){
        if(!carRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found");
        }

        carRepository.deleteById(id);
    }

    public void updateCar(Integer id, CarDTO dto) {
        Car car = getCarById(id);

        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setPrice(dto.getPrice());
        car.setYear(dto.getYear());

        CarStatus status = carStatusRepository.findById(dto.getIdStatus())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Status not found"));
        car.setCarStatus(status);

        Location location = locationRepository.findById(dto.getIdLocation())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found"));
        car.setLocation(location);

        carRepository.save(car);
    }
}
