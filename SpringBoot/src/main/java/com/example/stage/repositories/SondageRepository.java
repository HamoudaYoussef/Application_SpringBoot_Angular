package com.example.stage.repositories;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.Role;
import com.example.stage.entities.Sondage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SondageRepository  extends JpaRepository<Sondage, Long> {

    Sondage findByLien(String lien);
    List<Sondage> findByEntreprise(Entreprise e);



}
