package com.example.backend.controllers;

import com.example.backend.dtos.CarDTO;
import com.example.backend.models.Car;
import com.example.backend.services.CarService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "http://localhost:5173")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/all")
    public List<Car> getAllCars(){
        return carService.getAllCars();
    }

    @GetMapping("/id/{id}")
    public Car getCarById(@PathVariable Integer id){
        return carService.getCarById(id);
    }

    @GetMapping("/all/city/{city}")
    public List<Car> getAllCarsInCity(@PathVariable String city){
        return carService.getAllCarsInCity(city);
    }

    @PostMapping("/create")
    public void createCar(@Valid @RequestBody CarDTO carDTO){
        carService.createCar(carDTO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCar(@PathVariable Integer id){
        carService.deleteCar(id);
    }
}
