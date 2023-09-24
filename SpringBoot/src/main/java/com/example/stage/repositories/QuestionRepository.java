package com.example.stage.repositories;

import com.example.stage.entities.Question;
import com.example.stage.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository  extends JpaRepository<Question, Long> {
    List<Question> findQuestionsBySondage_Id(Long sondageId);
     Question findQuestionBySondage_Id(Long sondageId);
    void deleteQuestionsBySondage_Id(Long sondageId);

}
