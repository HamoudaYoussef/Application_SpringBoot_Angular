package com.example.stage.repositories;

import com.example.stage.entities.SondageCorrespondance;
import com.example.stage.entities.UserCorrespondace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCorrespondaceRepository  extends JpaRepository<UserCorrespondace, Long> {

    UserCorrespondace findByHasheduserid(String hashedId);
}
