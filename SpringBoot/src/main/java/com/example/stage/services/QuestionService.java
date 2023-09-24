package com.example.stage.services;

import com.example.stage.entities.Question;
import com.example.stage.entities.Reponse;
import com.example.stage.entities.Sondage;
import com.example.stage.repositories.QuestionRepository;
import com.example.stage.repositories.ReponseRepository;
import com.example.stage.repositories.SondageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService implements IQuestionService {
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    SondageRepository sondageRepository;
    @Autowired
    ReponseRepository reponseRepository;
    @Autowired

    ReponseService reponseService;

    @Override
    public Question createQuestion(Question question,Long sondageId){

        Sondage sondage = sondageRepository.findById(sondageId).orElse(null);
        question.setSondage(sondage);
        return questionRepository.save(question);
    }
    @Override
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }
    @Override
    public Long getLastAddedQuestionId() {
        List<Question> questions = questionRepository.findAll();

        if (!questions.isEmpty()) {
            Question lastQuestion = questions.get(questions.size() - 1);
            return lastQuestion.getId();
        }
        return null;
    }

    @Override
    public List<Question> findQuestionsBySondageId(Long sondageId) {
        return questionRepository.findQuestionsBySondage_Id(sondageId);
    }
    @Override
    public void deleteQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElse(null);

        if (question != null) {
            // Récupérer toutes les réponses liées à cette question
            List<Reponse> reponses = reponseRepository.findByQuestionId(questionId);

            // Supprimer toutes les réponses liées à la question
            for (Reponse reponse : reponses) {
                reponseService.deleteReponse(reponse.getId());
            }

            // Assurez-vous que la référence à la question est définie à null
            question.setSondage(null);
            questionRepository.save(question);

            // Maintenant, vous pouvez supprimer la question elle-même
            questionRepository.deleteById(questionId);
        }
    }
    @Override
    public Question findQuestionBySondageId(Long sondageId) {
        return questionRepository.findQuestionBySondage_Id(sondageId);
    }

    @Override
    @Transactional
    public  void deleteQuestionsBySondage_Id(Long sondageId) {
        List<Question> questions = questionRepository.findQuestionsBySondage_Id(sondageId);

        for (Question question : questions) {
            reponseService.deleteReponsesByQuestion_Id(question.getId());
        }
         questionRepository.deleteQuestionsBySondage_Id(sondageId);
    }

    @Override
    public void updateQuestionTitre(Long questionId, String nouveauTitre) {
        Optional<Question> questionOpt = questionRepository.findById(questionId);
        if (questionOpt.isPresent()) {
            Question question = questionOpt.get();
            question.setTitre(nouveauTitre); // Utilisez le setter pour mettre à jour le titre
            questionRepository.save(question); // Enregistrez la réponse mise à jour dans la base de données
        } else {
            // Gérez le cas où la réponse avec l'ID spécifié n'a pas été trouvée.
            // Vous pouvez lever une exception ou gérer l'erreur de la manière qui vous convient.
        }
    }



}
