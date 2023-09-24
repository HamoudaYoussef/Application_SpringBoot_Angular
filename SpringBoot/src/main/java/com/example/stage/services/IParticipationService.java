package com.example.stage.services;

import com.example.stage.entities.Sondage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;

import java.util.List;

public interface IParticipationService {
    List<Sondage> getSondagesForUser(@NonNull HttpServletRequest request);
}
