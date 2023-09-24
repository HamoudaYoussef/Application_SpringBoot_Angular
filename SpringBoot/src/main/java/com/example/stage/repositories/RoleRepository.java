package com.example.stage.repositories;

import com.example.stage.entities.Role;
import com.example.stage.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    static Optional<Object> findByID(long l) {
        return null;
    }
}
