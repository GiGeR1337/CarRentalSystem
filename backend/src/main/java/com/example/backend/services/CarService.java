package com.example.backend.services;

import com.example.backend.dtos.CarDTO;
import com.example.backend.models.Car;
import com.example.backend.models.CarStatus;
import com.example.backend.models.Location;
import com.example.backend.repositories.CarRepository;
import com.example.backend.repositories.CarStatusRepository;
import com.example.backend.repositories.LocationRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CarService {
    private final CarRepository carRepository;
    private final LocationRepository locationRepository;
    private final CarStatusRepository carStatusRepository;

    public CarService(CarRepository carRepository, LocationRepository locationRepository, CarStatusRepository carStatusRepository) {
        this.carRepository = carRepository;
        this.locationRepository = locationRepository;
        this.carStatusRepository = carStatusRepository;
    }

    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    public List<Car> getAllCarsInCity(String city){
        return carRepository.findAllByLocation_City(city);
    }

    public Car getCarById(Integer id){
        return carRepository.findById(id).orElse(null);
    }

    public void createCar(CarDTO dto) {
        Car car = new Car();
        car.setBrand(dto.getBrand());
        car.setModel(dto.getModel());
        car.setPrice(dto.getPrice());
        car.setYear(dto.getYear());

        CarStatus status = carStatusRepository.findById(dto.getIdStatus()).orElseThrow();
        Location location = locationRepository.findById(dto.getIdLocation()).orElseThrow();

        car.setCarStatus(status);
        car.setLocation(location);

        carRepository.save(car);
    }

    public void deleteCar(Integer id){
        carRepository.deleteByIdCar(id);
    }
}
