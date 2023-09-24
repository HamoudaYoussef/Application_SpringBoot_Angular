package com.example.stage.services;

import com.example.stage.entities.*;
import com.example.stage.repositories.*;
import com.example.stage.security.AuthenticationResponse;
import com.example.stage.security.SondageResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Part;
import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor


public class SondageService implements ISondageService {
    @Autowired
    SondageRepository sondageRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    ReponseUserRepository reponseUserRepository;
    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    HistoriqueRepository historiqueRepository;
    @Autowired
    EntrepriseRepository entrepriseRepository;
    @Autowired
    ParticipationRepository participationRepository;

    @Autowired
    IEntrepriseService entrepriseService;
    @Autowired
    IJwtService jwtService;
    @Autowired
    IQuestionService questionService;
    @Autowired
    IReponseService reponseService;

    @Override
    public SondageResponse createSondage(Sondage sondage, @NonNull HttpServletRequest request) {
        Entreprise entreprise = entrepriseService.getEntrepriseByToken(request);

        sondage.setEntreprise(entreprise);
        sondageRepository.save(sondage);
        return SondageResponse.builder()
                .id(sondage.getId())
                .build();
    }
    @Override
    public void addnbParticipantEtCrit(Long sondageId, @NonNull HttpServletRequest request,int nbr_participant, int minage,int maxage, Gender gender,String nomSondage, String Description) {
        Entreprise entreprise = entrepriseService.getEntrepriseByToken(request);
        Optional<Sondage> sondageOpt = sondageRepository.findById(sondageId);
        if (sondageOpt.isPresent()) {
            Sondage sondage = sondageOpt.get();
            sondage.setNbr_participant(nbr_participant);
            sondage.setMinage(minage);
            sondage.setMaxage(maxage);
            sondage.setGender(gender);
            sondage.setNomsondage(nomSondage);
            sondage.setDescription(Description);
            sondage.setEntreprise(entreprise);

            // Utilisez le setter pour mettre à jour le titre
            sondageRepository.save(sondage);
            if (entreprise.getPoints() >= sondage.getNbr_participant()) {
                entreprise.setPoints(entreprise.getPoints() - sondage.getNbr_participant());

                Historique historique = new Historique();
                historique.setEntreprise(entreprise);
                historique.setPoints(- sondage.getNbr_participant());  // Points perdus
                historique.setDatechangecredit(new Date());
                historiqueRepository.save(historique);
                // Mettez à jour l'entreprise dans la base de données
                entrepriseRepository.save(entreprise);
            } else {
                throw new RuntimeException("Pas assez de points disponibles.");
            }// Enregistrez la réponse mise à jour dans la base de données
        } else {
            System.out.println("rrr");
        }
    }


    @Override
    public Sondage getSondageById(Long id) {
        return sondageRepository.findById(id).get();
    }
    @Override
    public Sondage getSondageByLien(String lien) {
        return sondageRepository.findByLien(lien);
    }

    @Override
    public SondageResponse getLastAddedSondageId() {
        List<Sondage> sondages = sondageRepository.findAll();

        if (!sondages.isEmpty()) {
            Sondage lastSondage = sondages.get(sondages.size() - 1);
            Map<String, Object> claims = new HashMap<>();

            String id = lastSondage.getId().toString();
            claims.put("id", id);
            String entreprise_id = lastSondage.getEntreprise().getId().toString();
            claims.put("entreprise_id", entreprise_id);

            var jwtToken = jwtService.generateSondageToken(claims);
            lastSondage.setLien(jwtToken);
            sondageRepository.save(lastSondage);

            SondageResponse response = new SondageResponse();
            response.setId(lastSondage.getId());
            response.setTokens(jwtToken);
            return response;

        }
        return null;
    }
    @Override
    public Long getLst() {
        List<Sondage> sondages = sondageRepository.findAll();

        if (!sondages.isEmpty()) {
            Sondage lastSondage = sondages.get(sondages.size() - 1);
            return lastSondage.getId();
        }
        return null;
    }
    @Override
    public List<Sondage> getAllSondages() {
        return  sondageRepository.findAll();
    }
    @Override
    public Sondage updateSondage(Sondage s, Long idSondage) {
        Sondage sondage = sondageRepository.findById(idSondage).orElse(null);
        sondage.setCout(s.getCout());
        //sondage.setCritere(s.getCritere());
        //sondage.setLien(s.getLien());
        //sondage.setNbr_participant(s.getNbr_participant());
        sondageRepository.save(sondage);
        return sondage;
    }

    @Override
    public List<Sondage> getSondageByEntreprise(Entreprise entreprise) {
        return sondageRepository.findByEntreprise(entreprise);
    }
    @Override
    @Transactional
    public void findSondageQuestionReponse(Long sondageId) {
        Sondage sondage = sondageRepository.findById(sondageId).orElse(null);

        if (sondage != null) {
            Question question = questionService.findQuestionBySondageId(sondageId);

            if (question != null) {
                Reponse reponse = reponseService.getReponseByQuestionId(sondageId);
                // Continuez à travailler avec les objets sondage, question et reponse ici
            }
        }
    }

    @Override
    public void deleteSondage(Long sondageId) {
        Sondage sondage = sondageRepository.findById(sondageId).orElse(null);



        if (sondage != null) {
            List<ReponseUser> reponsesUsers = reponseUserRepository.findBySondage_Id(sondageId);
            // Supprimer toutes les réponses liées à la question
            for (ReponseUser reponseUser : reponsesUsers) {
                reponseUser.setSondage(null);
                reponseUser.setUser(null);
                reponseUser.setQuestion(null);
                reponseUser.setReponse(null);
                reponseUserRepository.deleteById(reponseUser.getId());
            }

            List<Question> questions = questionRepository.findQuestionsBySondage_Id(sondageId);

            // Supprimer toutes les réponses liées à la question
            for (Question question : questions) {
                questionService.deleteQuestion(question.getId());
            }

            List<Participation> participations = participationRepository.findParticipationsBySondage_Id(sondageId);
            // Supprimer toutes les réponses liées à la question
            for (Participation participation : participations) {
                participation.setSondage(null);
                participation.setUser(null);
                participationRepository.deleteById(participation.getId());
            }


            // Récupérer toutes les réponses liées à cette question


            // Assurez-vous que la référence à la question est définie à null
            sondage.setEntreprise(null);
            sondageRepository.save(sondage);

            // Maintenant, vous pouvez supprimer la question elle-même
            sondageRepository.deleteById(sondageId);
        }
    }
}