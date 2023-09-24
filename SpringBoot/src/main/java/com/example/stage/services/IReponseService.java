package com.example.stage.services;

import com.example.stage.entities.Question;
import com.example.stage.entities.Reponse;
import com.example.stage.repositories.ReponseRepository;

import java.util.List;

public interface IReponseService {
    public Reponse addReponse(Reponse reponse,Long questionId);

    void updateReponseTitre(Long reponseId, String nouveauTitre);
    public void deleteReponse(Long idReponse);

    public List<Reponse> allReponses();

    Reponse retrieveReponseById(Integer reponseId);

    List<Reponse> getReponsesByQuestionId(Long questionId);
    void deleteReponsesByQuestion_Id(Long questionId);
    Reponse getReponseByQuestionId(Long questionId);

}