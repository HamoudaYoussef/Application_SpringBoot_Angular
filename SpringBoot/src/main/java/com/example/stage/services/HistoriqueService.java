package com.example.stage.services;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.Historique;
import com.example.stage.entities.Question;
import com.example.stage.repositories.HistoriqueRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class HistoriqueService implements IHistoriqueService{

    @Autowired
    HistoriqueRepository historiqueRepository;

    @Override
    public void ajouterPoints(Entreprise entreprise, int points) {

     int pointsajoutees = entreprise.getPoints() + points;
      entreprise.setPoints(pointsajoutees);

        Historique historique = new Historique();
        historique.setEntreprise(entreprise);
        historique.setPoints(+ points);
        historique.setDatechangecredit(new Date());
        historiqueRepository.save(historique);
    }

    @Override
    public List<Historique> findHistoriquesByEntreprise_Id(Long id) {
        return historiqueRepository.findHistoriquesByEntreprise_Id(id);
    }


}
