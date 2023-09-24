package com.example.stage.repositories;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {

    Optional<Entreprise> findByEmail(String email);

}
