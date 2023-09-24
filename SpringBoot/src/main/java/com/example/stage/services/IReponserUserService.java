package com.example.stage.services;

import com.example.stage.config.EtatException;
import com.example.stage.entities.ReponseUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IReponserUserService  {
    ReponseUser addReponse(Long reponseId, Long questionId, Long userId, Long sondage_id ) throws EtatException;
    List<ReponseUser> envoyerReponses(List<ReponseUser> reponses);
}
