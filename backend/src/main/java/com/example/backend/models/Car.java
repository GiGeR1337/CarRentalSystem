package com.example.backend.models;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "Car")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCar")
    private Integer idCar;

    @Column(name = "Brand", nullable = false, length = 250)
    private String brand;

    @Column(name = "Model", nullable = false, length = 250)
    private String model;

    @Column(name = "Price", nullable = false)
    private BigDecimal price;

    @Column(name = "Year", nullable = false)
    private Integer year;

    @ManyToOne
    @JoinColumn(name = "IdStatus", nullable = false)
    private CarStatus carStatus;

    @ManyToOne
    @JoinColumn(name = "Location_IdLocation", nullable = false)
    private Location location;

    public Car() {}

    public Integer getIdCar() { return idCar; }
    public void setIdCar(Integer idCar) { this.idCar = idCar; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public CarStatus getCarStatus() { return carStatus; }
    public void setCarStatus(CarStatus carStatus) { this.carStatus = carStatus; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }
}