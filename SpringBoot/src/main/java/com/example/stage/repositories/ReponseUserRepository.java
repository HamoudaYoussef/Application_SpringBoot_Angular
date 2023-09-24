package com.example.stage.repositories;

import com.example.stage.entities.Reponse;
import com.example.stage.entities.ReponseUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReponseUserRepository extends JpaRepository<ReponseUser, Long> {

    List<ReponseUser> findBySondage_Id( Long sondageId);

}
