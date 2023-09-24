package com.example.stage.controllers;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.Historique;
import com.example.stage.services.IEntrepriseService;
import com.example.stage.services.IHistoriqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Historique")
@CrossOrigin(origins = "*")
public class HistoriqueController {
    @Autowired
    IHistoriqueService historiqueService;
    @Autowired
    IEntrepriseService entrepriseService;

    @PostMapping("/ajouter/{entrepriseId}/{points}")
    public ResponseEntity<String> ajouterPoints(@PathVariable("entrepriseId") Long entrepriseId, @PathVariable int points) {
        Entreprise entreprise = entrepriseService.getEntrepriseById(entrepriseId);
        try {
            historiqueService.ajouterPoints(entreprise, points);
            return ResponseEntity.ok("Points ajoutés avec succès.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Impossible d'ajouter les points : " + e.getMessage());
        }
    }
    @GetMapping("/findHistoriquesByEntreprise_Id/{id}")
    public List<Historique> findHistoriquesByEntreprise_Id(@PathVariable("id") Long id) {
return historiqueService.findHistoriquesByEntreprise_Id(id);
    }

}