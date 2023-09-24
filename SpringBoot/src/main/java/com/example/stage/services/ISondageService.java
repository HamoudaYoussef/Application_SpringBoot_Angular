package com.example.stage.services;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.Gender;
import com.example.stage.entities.Sondage;
import com.example.stage.security.AuthenticationResponse;
import com.example.stage.security.SondageResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;

import java.util.List;

public interface ISondageService {


    SondageResponse createSondage(Sondage sondage, HttpServletRequest request);
    Sondage getSondageById(Long id);
    SondageResponse getLastAddedSondageId();
    List<Sondage> getAllSondages();
    Long getLst();
    void addnbParticipantEtCrit(Long sondageId, @NonNull HttpServletRequest request,int nbr_participant, int minage,int maxage, Gender gender,String nomSondage, String Description);
    List<Sondage> getSondageByEntreprise(Entreprise entreprise);
    Sondage getSondageByLien(String link);

   /* String getOriginalSondageIdFromHashedId(String hashedSondageId);*/
   void deleteSondage(Long sondageId);
    void findSondageQuestionReponse(Long sondageId);
    Sondage updateSondage(Sondage s, Long idSondage);
}
