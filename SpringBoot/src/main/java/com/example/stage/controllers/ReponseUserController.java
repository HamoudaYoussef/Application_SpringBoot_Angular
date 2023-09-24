package com.example.stage.controllers;


import com.example.stage.config.EtatException;
import com.example.stage.entities.Reponse;
import com.example.stage.entities.ReponseUser;
import com.example.stage.services.IReponserUserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reponseuser")
@CrossOrigin(origins = "*")
public class ReponseUserController {
    @Autowired
    IReponserUserService iReponserUserService;

    @PostMapping("/addReponse/{question_id}/{idUser}/{reponse_id}/{sondage_id}")
    @Transactional
    public ReponseUser addReponse(@PathVariable("question_id") Long question_id,@PathVariable("idUser") Long userId ,@PathVariable("reponse_id") Long reponse_id,@PathVariable("sondage_id") Long sondage_id) throws EtatException {
        return iReponserUserService.addReponse(reponse_id,question_id,userId,sondage_id);
    }
    @PostMapping("/envoyer")
    public ResponseEntity<?> envoyerReponses(@RequestBody List<ReponseUser> reponses) {

        List<ReponseUser> savedReponses = iReponserUserService.envoyerReponses(reponses);
        return new ResponseEntity<>(savedReponses, HttpStatus.CREATED);
    }
}