package com.example.backend.services;

import com.example.backend.dtos.UserRegistrationDTO;
import com.example.backend.dtos.UserResponseDTO;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserResponseDTO registerUser(UserRegistrationDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());

        String hashedPassword = passwordEncoder.encode(dto.getPassword());
        user.setHashPassword(hashedPassword);

        User savedUser = userRepository.save(user);

        return new UserResponseDTO(
                savedUser.getIdUser(),
                savedUser.getName(),
                savedUser.getSurname(),
                savedUser.getEmail(),
                savedUser.getPhoneNumber()
        );
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
