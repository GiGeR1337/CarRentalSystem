package com.example.backend.services;

import com.example.backend.models.Role;
import com.example.backend.repositories.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public Role getRoleById(Integer id) {
        return roleRepository.findById(id).orElse(null);
    }

    @PostConstruct
    public void initRoles() {
        if (roleRepository.count() == 0) {
            saveRole("ROLE_USER");
            saveRole("ROLE_ADMIN");
        }
    }

    private void saveRole(String roleName) {
        Role role = new Role();
        role.setRoleName(roleName);
        roleRepository.save(role);
    }
}