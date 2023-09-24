package com.example.stage.controllers;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.Historique;
import com.example.stage.entities.Sondage;
import com.example.stage.services.IEntrepriseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/Entreprise")
@CrossOrigin(origins = "*")
public class EntrepriseController {
    @Autowired
    IEntrepriseService entrepriseService;


    @GetMapping("/findAllEntreprise")
    public List<Entreprise> findAllEntreprise() {
        return entrepriseService.getAllEntreprise();
    }

    @GetMapping("/getEntrepriseById/{entrepriseId}")
    @ResponseBody
    public Entreprise getEntrepriseById (@PathVariable("entrepriseId") Long entrepriseId){
        return entrepriseService.getEntrepriseById(entrepriseId);
    }
}
