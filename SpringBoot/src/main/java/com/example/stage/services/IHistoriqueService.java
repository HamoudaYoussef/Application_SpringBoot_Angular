package com.example.stage.services;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.Historique;

import java.util.List;

public interface IHistoriqueService
{
    void ajouterPoints(Entreprise entreprise, int points);
    List<Historique> findHistoriquesByEntreprise_Id(Long id);
}
