package com.example.stage.services;

import com.example.stage.entities.Question;

import java.util.List;

public interface IQuestionService {
    public Question createQuestion(Question question, Long sondageId);

    List<Question> getQuestions();

    Long getLastAddedQuestionId();
    void updateQuestionTitre(Long questionId, String nouveauTitre);
    List<Question> findQuestionsBySondageId(Long sondageId);
    Question findQuestionBySondageId(Long sondageId);
    void deleteQuestion(Long questionId);
    void deleteQuestionsBySondage_Id(Long sondageId);

}
