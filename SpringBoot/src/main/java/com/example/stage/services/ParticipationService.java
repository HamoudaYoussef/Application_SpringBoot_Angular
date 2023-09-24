package com.example.stage.services;

import com.example.stage.entities.Participation;
import com.example.stage.entities.Sondage;
import com.example.stage.entities.User;
import com.example.stage.repositories.ParticipationRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParticipationService implements IParticipationService{

    @Autowired
    private ParticipationRepository participationRepository;

    @Autowired
    private IUserService userService;

    @Override
    public List<Sondage> getSondagesForUser(@NonNull HttpServletRequest request) {
        User user = userService.getUserByToken(request);
        // Récupérer les participations de l'utilisateur donné
        List<Participation> participations = participationRepository.findByUser(user);
        // Initialiser une liste pour stocker les sondages associés à l'utilisateur
        List<Sondage> surveys = new ArrayList<>();

        // Parcourir les participations et extraire les sondages
        for (Participation participation : participations) {
            surveys.add(participation.getSondage());
        }
        return surveys;
    }
}
