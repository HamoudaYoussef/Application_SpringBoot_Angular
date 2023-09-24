package com.example.stage.controllers;


import com.example.stage.entities.*;
import com.example.stage.security.AuthenticationResponse;
import com.example.stage.security.SondageResponse;
import com.example.stage.services.IEntrepriseService;
import com.example.stage.services.IQuestionService;
import com.example.stage.services.ISondageService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class SondageController {
    @Autowired
    ISondageService iSondageService;

    @Autowired
    IEntrepriseService entrepriseService;
    @PostMapping("/createSondage")
    @ResponseBody
    public ResponseEntity<SondageResponse> createSondage (@RequestBody Sondage sondage, @NonNull HttpServletRequest request){
        return ResponseEntity.ok(iSondageService.createSondage(sondage,request)) ;
    }

    @GetMapping("/getSondageById/{sondageId}")
    @ResponseBody
    public Sondage getSondageById (@PathVariable("sondageId") Long sondageId){
        return iSondageService.getSondageById(sondageId);
    }

    @GetMapping("/last-added-sondage-id")
    public ResponseEntity<SondageResponse> getLastAddedSondageId() {
        SondageResponse response = iSondageService.getLastAddedSondageId();

        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getLst")
    public Long getLst() {
   return iSondageService.getLst();
    }
    @GetMapping("/getAllSondages")
    @ResponseBody
    public List<Sondage> getAllSondages (){
        return iSondageService.getAllSondages();
    }
    @GetMapping("/getSondageByToken/{lien}")
    @ResponseBody
    public Sondage getSondageByToken(@PathVariable("lien") String lien){
        return iSondageService.getSondageByLien(lien);
    }
    @PutMapping("/updateSondage/{idSondage}")
    @ResponseBody
    public Sondage  updateSondage(@RequestBody Sondage c,@PathVariable Long idSondage){
        return iSondageService.updateSondage(c,idSondage);
    }
    @GetMapping( "/confirmSondage")
    public ResponseEntity<String> confirmSondageToken(@RequestParam("token") String token) {

        // Redirect to the Angular route after successful confirmation
        String redirectUrl = "http://localhost:4200/authentication"; // Replace with your Angular route URL
        HttpHeaders headers = new HttpHeaders();
        headers.add("Location", redirectUrl);
        return new ResponseEntity<>(headers, HttpStatus.FOUND);

    }

    @PutMapping("/addParticipantEtCrit/{sondageId}/{nbP}/{minAge}/{maxAge}/{gender}/{nomSondage}/{desc}")
    public void addParticipantEtCrit(@PathVariable("sondageId") Long sondageId,
                                                        @PathVariable("nbP") int nbrParticipant,
                                                        @PathVariable("minAge") int minAge,
                                                        @PathVariable("maxAge") int maxAge,
                                                        @PathVariable("gender") Gender gender,
                                                        @PathVariable("nomSondage")String nomSondage,
                                                        @PathVariable("desc") String desc,
                                                        @NonNull HttpServletRequest request) {
        iSondageService.addnbParticipantEtCrit(sondageId, request, nbrParticipant, minAge,maxAge, gender,nomSondage,desc);
    }

    @GetMapping("/findSondageByEntrepriseId")
    public List<Sondage> getSondageByEntrepriseId(@NonNull HttpServletRequest request){
        Entreprise entreprise = entrepriseService.getEntrepriseByToken(request);
        // Obtenez les sondages pour l'entreprise spécifiée
        return iSondageService.getSondageByEntreprise(entreprise);
    }


    @DeleteMapping("/deleteSondage/{sondageId}")
    @Transactional
    public ResponseEntity<String> deleteSondage(@PathVariable("sondageId") Long sondageId) {
        iSondageService.deleteSondage(sondageId);
        return new ResponseEntity<String>("sondage with '"+sondageId+"' has been sucessfully deleted", HttpStatus.OK);
    }
}





