package com.example.stage.repositories;

import com.example.stage.entities.Sondage;
import com.example.stage.entities.SondageCorrespondance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SondageCorrespondanceRepository  extends JpaRepository<SondageCorrespondance, Long> {
  /*  SondageCorrespondance findByHashedid(String hashedId);*/

}
