package com.example.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdLocation")
    private Integer idLocation;

    @Column(name = "City", nullable = false, length = 150)
    private String city;

    @Column(name = "Address", nullable = false, length = 150)
    private String address;

    public Location() {}

    public Integer getIdLocation() { return idLocation; }
    public void setIdLocation(Integer idLocation) { this.idLocation = idLocation; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}