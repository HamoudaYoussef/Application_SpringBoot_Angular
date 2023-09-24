package com.example.stage.services;

import com.example.stage.config.EtatException;
import com.example.stage.entities.*;
import com.example.stage.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReponseUserService implements IReponserUserService{
    @Autowired
    ReponseUserRepository reponseUserRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    SondageRepository sondageRepository;
    @Autowired
    ParticipationRepository participationRepository;
    @Autowired
    ReponseRepository reponseRepository;
    @Autowired
    QuestionRepository questionRepository;

    @Override
    public ReponseUser addReponse(Long reponseId, Long questionId, Long userId, Long sondage_id ) throws EtatException {
        List<Participation> participations = participationRepository.findParticipationsByUser_IdAndSondage_Id(userId, sondage_id);

        if (participations.isEmpty()) {
            throw new EntityNotFoundException("Aucune participation trouvée pour l'utilisateur avec l'ID : " + userId);
        }

        for (Participation participation : participations) {
            participation.setEtat(true);
            participationRepository.save(participation);
            if (participation.isEtat()) {
                // L'état est true, lancez une exception
                throw new EtatException("L'état est true, ce qui est une condition invalide.");
            }
        }



        ReponseUser reponseUser = new ReponseUser();

        Reponse reponse = reponseRepository.findById(reponseId).orElseThrow(() -> new EntityNotFoundException("Réponse introuvable avec l'ID : " + reponseId));
        reponseUser.setReponse(reponse);

        Question question = questionRepository.findById(questionId).orElseThrow(() -> new EntityNotFoundException("Question introuvable avec l'ID : " + questionId));
        reponseUser.setQuestion(question);

        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("Utilisateur introuvable avec l'ID : " + userId));
        reponseUser.setUser(user);

        Sondage sondage = sondageRepository.findById(sondage_id).orElseThrow(() -> new EntityNotFoundException("Sondage introuvable avec l'ID : " + sondage_id));
        reponseUser.setSondage(sondage);

        reponseUserRepository.save(reponseUser);

        return reponseUser;

    }

    @Override
    public List<ReponseUser> envoyerReponses(List<ReponseUser> reponses) {
        // Votre logique pour traiter et enregistrer les réponses ici
        return reponseUserRepository.saveAll(reponses);
    }


}