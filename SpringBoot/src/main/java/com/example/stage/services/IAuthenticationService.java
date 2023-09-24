package com.example.stage.services;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.User;
import com.example.stage.repositories.EntrepriseRepository;
import com.example.stage.security.AuthenticationRequest;
import com.example.stage.security.AuthenticationResponse;
import com.example.stage.security.RegisterRequest;
import jakarta.mail.MessagingException;

public interface IAuthenticationService {
    AuthenticationResponse register(Entreprise e, User u) throws MessagingException;
    AuthenticationResponse registerCitoyen(RegisterRequest request,Entreprise e) throws MessagingException;
    AuthenticationResponse authenticate(AuthenticationRequest authRequest);
    void sendMail(User user,Entreprise e, String link) throws MessagingException;

}
