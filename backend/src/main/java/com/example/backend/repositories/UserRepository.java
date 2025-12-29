package com.example.backend.repositories;

import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findAll();
    User findByEmail(String email);
    User findByPhoneNumber(String phoneNumber);
    boolean existsUserByEmail(String email);
    boolean existsUserByPhoneNumber(String phoneNumber);
}
