package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public class LocationDTO {
    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Address is required")
    private String address;

    // --- Getters and Setters ---
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
