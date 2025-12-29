package com.example.backend.services;

import com.example.backend.models.Car;
import com.example.backend.repositories.CarRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CarService {
    private final CarRepository carRepository;

    public CarService(CarRepository carRepository) {
        this.carRepository = carRepository;
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

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    public void deleteCar(Integer id){
        carRepository.deleteByIdCar(id);
    }
}
