package com.example.backend.controllers;

import com.example.backend.dtos.UserRegistrationDTO;
import com.example.backend.dtos.UserResponseDTO;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<UserResponseDTO> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Integer id) {
        return userService.getUserById(id);
    }

    @GetMapping("/email/{email}")
    public UserResponseDTO getUserByEmail(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/phoneNumber/{phoneNumber}")
    public UserResponseDTO getUserByPhoneNumber(@PathVariable String phoneNumber) {
        return userService.getUserByPhoneNumber(phoneNumber);
    }

    @PostMapping("/register")
    public UserResponseDTO registerUser(@Valid @RequestBody UserRegistrationDTO userDto) {
        return userService.registerUser(userDto);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUserById(@PathVariable Integer id){
        userService.deleteUser(id);
    }
}