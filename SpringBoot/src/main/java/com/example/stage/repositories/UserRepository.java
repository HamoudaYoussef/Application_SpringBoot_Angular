package com.example.stage.repositories;

import com.example.stage.entities.Gender;
import com.example.stage.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findUsersByGender(Gender gender);
    List<User> findByAgeBetween(int minAge, int maxAge);
    List<User> findByGender(Gender gender);
   // List<User> findByGenderAndGender(Gender gender,int minAge, int maxAge);




  /*  @Transactional
    @Modifying
    @Query("UPDATE User u " +
            "SET u.enabled = TRUE WHERE u.email = ?1")
    int enableUser(String email);
    /*@Modifying
    @Query("UPDATE User r SET r.role=2 where r.firstname='si'")
    void insertRole(@Param("role_id") String role_id);*/
}
