package com.example.backend.repositories;

import com.example.backend.models.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Integer> {
    List<Car> findAll();
    Car findByIdCar(Integer idCar);
    void deleteByIdCar(Integer idCar);
}
