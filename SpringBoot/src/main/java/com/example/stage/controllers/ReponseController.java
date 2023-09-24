package com.example.stage.controllers;

import com.example.stage.entities.Reponse;
import com.example.stage.security.AuthenticationResponse;
import com.example.stage.security.RegisterRequest;
import com.example.stage.services.IReponseService;
import com.example.stage.services.IUserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reponse")
@CrossOrigin(origins = "*")
public class ReponseController {

    @Autowired
    private IReponseService reponseService;

    @PostMapping("/addReponse/{idq}")
    @Transactional
    public Reponse addReponse(@RequestBody Reponse p, @PathVariable("idq") Long idQ){
        return reponseService.addReponse(p,idQ);
    }
    @GetMapping("reponses")
    List<Reponse> getAllReponses()
    {
        return reponseService.allReponses();
    }

    @GetMapping("/reponse/{questionId}")
    public ResponseEntity<List<Reponse>> getReponsesByQuestionId(@PathVariable Long questionId) {
        List<Reponse> reponses = reponseService.getReponsesByQuestionId(questionId);
        return ResponseEntity.ok(reponses);
    }
    @DeleteMapping("/deleteReponse/{reponseId}")
    @Transactional
    public ResponseEntity<String> deleteReponse(@PathVariable("reponseId") Long reponseId) {
        reponseService.deleteReponse(reponseId);
        return new ResponseEntity<String>("question with '"+reponseId+"' has been sucessfully deleted", HttpStatus.OK);
    }

    @PutMapping("updateReponse/{reponseId}/{nouveauTitre}")
    public void updateReponseTitre(
            @PathVariable("reponseId") Long reponseId,
            @PathVariable("nouveauTitre") String nouveauTitre)
    {         reponseService.updateReponseTitre(reponseId, nouveauTitre);}

}