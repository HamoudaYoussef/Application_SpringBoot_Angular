package com.example.stage.services;

import com.example.stage.entities.Question;
import com.example.stage.entities.Reponse;
import com.example.stage.repositories.QuestionRepository;
import com.example.stage.repositories.ReponseRepository;
import com.example.stage.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReponseService implements IReponseService{

    @Autowired
    ReponseRepository reponseRepository;
    @Autowired
    QuestionRepository questionRepository;


    @Override
    public Reponse addReponse(Reponse reponse,Long questionId) {
        Question question = questionRepository.findById(questionId).get();
        reponse.setQuestion(question);
        return reponseRepository.save(reponse);
    }


    @Override
    public void deleteReponse(Long reponseId) {
        Reponse reponse = reponseRepository.findById(reponseId).orElse(null);

        if (reponse != null) {
            // Assurez-vous que la référence à la question est définie à null
            reponse.setQuestion(null);
            reponseRepository.save(reponse);

            // Maintenant, vous pouvez supprimer la réponse
            reponseRepository.deleteById(reponseId);
        }
    }

    @Override
    public List<Reponse> allReponses() {
        return reponseRepository.findAll();

    }
    public void updateReponseTitre(Long reponseId, String nouveauTitre) {
        Optional<Reponse> reponseOpt = reponseRepository.findById(reponseId);
        if (reponseOpt.isPresent()) {
            Reponse reponse = reponseOpt.get();
            reponse.setTitre(nouveauTitre); // Utilisez le setter pour mettre à jour le titre
            reponseRepository.save(reponse); // Enregistrez la réponse mise à jour dans la base de données
        } else {
            // Gérez le cas où la réponse avec l'ID spécifié n'a pas été trouvée.
            // Vous pouvez lever une exception ou gérer l'erreur de la manière qui vous convient.
        }
    }

    @Override
    public Reponse retrieveReponseById(Integer reponseId) {
        return null;
    }
    @Override
    public List<Reponse> getReponsesByQuestionId(Long questionId) {
        return reponseRepository.findByQuestionId(questionId);
    }

    @Override
    public void deleteReponsesByQuestion_Id(Long questionId) {

    }

    @Override
    public Reponse getReponseByQuestionId(Long questionId) {
        return reponseRepository.findByQuestion_Id(questionId);
    }






}