package com.example.stage.repositories;

import com.example.stage.entities.Historique;
import com.example.stage.entities.Participation;
import com.example.stage.entities.Sondage;
import com.example.stage.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParticipationRepository extends JpaRepository<Participation, Long> {

    Participation findBySondage_Id(Long sodageId);
    List<Participation> findParticipationsBySondage_Id(Long sodageId);
    List<Participation> findByUser(User user);
    List<Participation> findParticipationsByUser_IdAndSondage_Id(Long UserId,Long SondageId);


}
