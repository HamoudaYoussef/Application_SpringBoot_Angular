package com.example.stage.controllers;

import com.example.stage.entities.Sondage;
import com.example.stage.services.IParticipationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Participation")
@CrossOrigin(origins = "*")
public class ParticipationController {

    @Autowired
    private IParticipationService participationService;

    @GetMapping("/getSondagesByUser")
    public List<Sondage> getSondagesForUser(@NonNull HttpServletRequest request) {
        return participationService.getSondagesForUser(request);
    }
}
