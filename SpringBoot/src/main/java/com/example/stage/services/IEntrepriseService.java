package com.example.stage.services;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;

import java.util.List;

public interface IEntrepriseService {
    Entreprise getEntrepriseByEmail(String email);
    boolean getEnbabled(Entreprise entreprise);
   Entreprise getEntrepriseByToken(@NonNull HttpServletRequest request);
    Entreprise getEntrepriseById(Long id);
    List<Entreprise> getAllEntreprise();
}
