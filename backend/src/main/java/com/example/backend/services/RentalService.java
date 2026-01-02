package com.example.backend.services;

import com.example.backend.dtos.RentalDTO;
import com.example.backend.models.*;
import com.example.backend.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class RentalService {
    private final RentalRepository rentalRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final RentalStatusRepository rentalStatusRepository;
    private final CarStatusRepository carStatusRepository;

    public RentalService(RentalRepository rentalRepository, CarRepository carRepository, UserRepository userRepository, RentalStatusRepository rentalStatusRepository, CarStatusRepository carStatusRepository) {
        this.rentalRepository = rentalRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
        this.rentalStatusRepository = rentalStatusRepository;
        this.carStatusRepository = carStatusRepository;
    }

    public List<Rental> getAllRentalsByIdCar(Integer id){
        return rentalRepository.findAllByCar_IdCar(id);
    }

    public List<Rental> getAllRentalsByIdUser(Integer id){
        return rentalRepository.findAllByUser_IdUser(id);
    }

    public Integer getUserIdByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(User::getIdUser)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    @Transactional
    public void createRental(RentalDTO dto, String userEmail) {
        if (dto.getDateFrom().isAfter(dto.getDateTo())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date cannot be after end date");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Car car = carRepository.findById(dto.getIdCar())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Car not found"));

        if (!"AVAILABLE".equalsIgnoreCase(car.getCarStatus().getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Car is currently not available");
        }

        long days = ChronoUnit.DAYS.between(dto.getDateFrom(), dto.getDateTo());
        if (days == 0) days = 1;
        BigDecimal totalPrice = car.getPrice().multiply(BigDecimal.valueOf(days));

        RentalStatus activeRentalStatus = rentalStatusRepository.findByStatus("ACTIVE")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Rental Status 'ACTIVE' not found"));

        CarStatus rentedCarStatus = carStatusRepository.findByStatus("RENTED")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Car Status 'RENTED' not found"));

        Rental rental = new Rental();
        rental.setUser(user);
        rental.setCar(car);
        rental.setDateFrom(dto.getDateFrom());
        rental.setDateTo(dto.getDateTo());
        rental.setFinalPrice(totalPrice);
        rental.setRentalStatus(activeRentalStatus);

        rentalRepository.save(rental);

        car.setCarStatus(rentedCarStatus);
        carRepository.save(car);
    }

    public void cancelRental(Integer rentalId, String userEmail) {
        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental not found"));

        if (!rental.getUser().getEmail().equals(userEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only cancel your own rentals");
        }

        RentalStatus cancelledStatus = rentalStatusRepository.findByStatus("CANCELLED")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Status 'CANCELLED' not found"));
        rental.setRentalStatus(cancelledStatus);

        Car car = rental.getCar();
        CarStatus availableStatus = carStatusRepository.findByStatus("AVAILABLE")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Status 'AVAILABLE' not found"));
        car.setCarStatus(availableStatus);

        carRepository.save(car);
        rentalRepository.save(rental);
    }

    public void updateMyRental(Integer rentalId, RentalDTO dto, String userEmail) {
        Rental rental = rentalRepository.findById(rentalId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rental not found"));

        if (!rental.getUser().getEmail().equals(userEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only update your own rentals");
        }

        if (!"ACTIVE".equalsIgnoreCase(rental.getRentalStatus().getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot update a completed or cancelled rental");
        }

        if (dto.getDateFrom().isAfter(dto.getDateTo())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Start date cannot be after end date");
        }

        rental.setDateFrom(dto.getDateFrom());
        rental.setDateTo(dto.getDateTo());

        Car car = rental.getCar();
        long days = ChronoUnit.DAYS.between(dto.getDateFrom(), dto.getDateTo());
        if (days == 0) days = 1;
        rental.setFinalPrice(car.getPrice().multiply(BigDecimal.valueOf(days)));

        rentalRepository.save(rental);
    }
}
