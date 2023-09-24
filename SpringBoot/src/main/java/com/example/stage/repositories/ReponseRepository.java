package com.example.stage.repositories;

import com.example.stage.entities.Reponse;
import com.example.stage.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReponseRepository extends JpaRepository<Reponse, Long> {
    List<Reponse> findByQuestionId(Long questionId);

    void deleteReponsesByQuestion_Id(Long questionId);
    Reponse findByQuestion_Id(Long questionId);

}