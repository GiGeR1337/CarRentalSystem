package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public class CarStatusDTO {
    @NotBlank(message = "Status name is required")
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
