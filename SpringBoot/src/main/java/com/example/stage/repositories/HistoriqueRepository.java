package com.example.stage.repositories;

import com.example.stage.entities.Historique;
import com.example.stage.entities.Question;
import com.example.stage.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoriqueRepository extends JpaRepository<Historique, Long> {

    List<Historique> findHistoriquesByEntreprise_Id(Long id);
}
