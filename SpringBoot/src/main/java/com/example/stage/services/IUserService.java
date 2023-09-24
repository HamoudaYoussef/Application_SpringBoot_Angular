package com.example.stage.services;

import com.example.stage.entities.Gender;
import com.example.stage.entities.Sondage;
import com.example.stage.entities.User;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import org.springframework.stereotype.Component;

import java.util.List;


public interface IUserService {
    User getUserByEmail(String email);
    boolean getEnbabled(User user);
    User getUserByToken(@NonNull HttpServletRequest request);

    List<User> getRandomUsers(Long IdSondage) throws MessagingException;

    void sendMailUser(User user, String link) throws MessagingException;

    String getOriginalUserIdFromHashedId(String hashedSondageId);
    List<User> filtrerParAge(int minAge, int maxAge);
    List<User> filtrerParSexe(Gender gender);

}
