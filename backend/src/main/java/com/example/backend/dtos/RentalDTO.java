package com.example.backend.dtos;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public class RentalDTO {
    @NotNull(message = "Start date is required")
    private LocalDate dateFrom;

    @NotNull(message = "End date is required")
    private LocalDate dateTo;

    @NotNull(message = "Final price is required")
    private BigDecimal finalPrice;

    @NotNull(message = "User ID is required")
    private Integer idUser;

    @NotNull(message = "Car ID is required")
    private Integer idCar;

    @NotNull(message = "Rental Status ID is required")
    private Integer idStatus;

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public BigDecimal getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(BigDecimal finalPrice) {
        this.finalPrice = finalPrice;
    }

    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public Integer getIdCar() {
        return idCar;
    }

    public void setIdCar(Integer idCar) {
        this.idCar = idCar;
    }

    public Integer getIdStatus() {
        return idStatus;
    }

    public void setIdStatus(Integer idStatus) {
        this.idStatus = idStatus;
    }
}
