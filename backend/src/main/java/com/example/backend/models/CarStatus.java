package com.example.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "CarStatus")
public class CarStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdStatus")
    private Integer idStatus;

    @Column(name = "Status", nullable = false, length = 150)
    private String status;

    public CarStatus() {}

    public Integer getIdStatus() { return idStatus; }
    public void setIdStatus(Integer idStatus) { this.idStatus = idStatus; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}