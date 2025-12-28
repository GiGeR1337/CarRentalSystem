package com.example.backend.models;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "Rental")
public class Rental {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdRental")
    private Integer idRental;

    @Column(name = "DateFrom", nullable = false)
    private LocalDate dateFrom;

    @Column(name = "DateTo", nullable = false)
    private LocalDate dateTo;

    @Column(name = "FinalPrice", nullable = false)
    private BigDecimal finalPrice;

    @ManyToOne
    @JoinColumn(name = "IdUser", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "IdCar", nullable = false)
    private Car car;

    @ManyToOne
    @JoinColumn(name = "IdStatus", nullable = false)
    private RentalStatus rentalStatus;

    public Rental() {}

    public Integer getIdRental() { return idRental; }
    public void setIdRental(Integer idRental) { this.idRental = idRental; }

    public LocalDate getDateFrom() { return dateFrom; }
    public void setDateFrom(LocalDate dateFrom) { this.dateFrom = dateFrom; }

    public LocalDate getDateTo() { return dateTo; }
    public void setDateTo(LocalDate dateTo) { this.dateTo = dateTo; }

    public BigDecimal getFinalPrice() { return finalPrice; }
    public void setFinalPrice(BigDecimal finalPrice) { this.finalPrice = finalPrice; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Car getCar() { return car; }
    public void setCar(Car car) { this.car = car; }

    public RentalStatus getRentalStatus() { return rentalStatus; }
    public void setRentalStatus(RentalStatus rentalStatus) { this.rentalStatus = rentalStatus; }
}