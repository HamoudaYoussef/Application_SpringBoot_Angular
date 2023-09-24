package com.example.stage.services;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.User;
import com.example.stage.repositories.EntrepriseRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntrepriseService  implements IEntrepriseService{

    @Autowired
    EntrepriseRepository entrepriseRepository;

    @Autowired
   IJwtService jwtService;
    @Override
    public Entreprise getEntrepriseByEmail(String email) {
        return entrepriseRepository.findByEmail(email).get();
    }

    @Override
    public Entreprise getEntrepriseById(Long id) {
        return entrepriseRepository.findById(id).get();
    }
    public List<Entreprise> getAllEntreprise() { return entrepriseRepository.findAll();}


    @Override
    public boolean getEnbabled(Entreprise entreprise) {
        entreprise.setEnabled(true);
        entrepriseRepository.save(entreprise);
        return true;
    }

    public Entreprise getEntrepriseByToken(@NonNull HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUserEmail(jwt);

        return entrepriseRepository.findByEmail(userEmail).get();
    }


}
