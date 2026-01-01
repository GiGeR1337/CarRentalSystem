package com.example.backend.repositories;

import com.example.backend.models.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RentalRepository extends JpaRepository<Rental, Integer> {
    List<Rental> findAll();
    List<Rental> findAllByUser_IdUser(Integer idUser);
    List<Rental> findAllByCar_IdCar(Integer idCar);
}
