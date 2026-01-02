package com.example.backend.services;

import com.example.backend.dtos.UserRegistrationDTO;
import com.example.backend.dtos.UserResponseDTO;
import com.example.backend.models.*;
import com.example.backend.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final RentalRepository rentalRepository;
    private final CarStatusRepository carStatusRepository;
    private final CarRepository carRepository;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, RentalRepository rentalRepository, CarStatusRepository carStatusRepository, CarRepository carRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.rentalRepository = rentalRepository;
        this.carStatusRepository = carStatusRepository;
        this.carRepository = carRepository;
    }

    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponseDTO(
                        user.getIdUser(),
                        user.getName(),
                        user.getSurname(),
                        user.getEmail(),
                        user.getPhoneNumber()
                ))
                .collect(Collectors.toList());
    }

    public UserResponseDTO getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return new UserResponseDTO(
                user.getIdUser(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }

    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email: " + email));

        return new UserResponseDTO(
                user.getIdUser(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }

    public UserResponseDTO getUserByPhoneNumber(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with phone number: " + phoneNumber));

        return new UserResponseDTO(
                user.getIdUser(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getPhoneNumber()
        );
    }

    public UserResponseDTO registerUser(UserRegistrationDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());

        String hashedPassword = passwordEncoder.encode(dto.getPassword());
        user.setHashPassword(hashedPassword);

        Role userRole = roleRepository.findByRoleName("ROLE_USER")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Default role not found"));

        user.getRoles().add(userRole);

        User savedUser = userRepository.save(user);

        return new UserResponseDTO(
                savedUser.getIdUser(),
                savedUser.getName(),
                savedUser.getSurname(),
                savedUser.getEmail(),
                savedUser.getPhoneNumber()
        );
    }

    @Transactional
    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID: " + id);
        }

        List<Rental> userRentals = rentalRepository.findAllByUser_IdUser(id);

        for (Rental rental : userRentals) {
            if ("ACTIVE".equalsIgnoreCase(rental.getRentalStatus().getStatus())) {
                Car car = rental.getCar();

                CarStatus availableStatus = carStatusRepository.findByStatus("AVAILABLE")
                        .orElseThrow(() -> new RuntimeException("Status AVAILABLE not found in DB"));

                car.setCarStatus(availableStatus);
                carRepository.save(car);
            }
        }

        rentalRepository.deleteAll(userRentals);

        userRepository.deleteById(id);
    }
}
