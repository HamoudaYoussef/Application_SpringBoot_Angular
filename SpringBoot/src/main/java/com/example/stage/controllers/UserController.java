package com.example.stage.controllers;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.Gender;
import com.example.stage.entities.Sondage;
import com.example.stage.entities.User;
import com.example.stage.repositories.UserRepository;
import com.example.stage.services.IAuthenticationService;
import com.example.stage.services.IHistoriqueService;
import com.example.stage.services.IUserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/User")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private IUserService userService;
    @Autowired
    private IHistoriqueService historiqueService;


    @GetMapping("/randomUsers/{IdSondage}")
    public List<User> getRandomUsers(@PathVariable("IdSondage") Long IdSondage) throws MessagingException {
        return userService.getRandomUsers(IdSondage);
    }

    @PostMapping("/addPoints/{points}")
    public void ajouterPoints(Entreprise entreprise, @RequestBody int points){
         historiqueService.ajouterPoints(entreprise,points);
       }

    @GetMapping("/userOriginalId/{hashedUserId}")
    public String getOriginalUserIdFromHashedId(@PathVariable String hashedUserId) {
        String user = userService.getOriginalUserIdFromHashedId(hashedUserId);
        if (user != null) {
            return user; // Assurez-vous d'avoir une méthode pour obtenir l'original ID de l'entité
        } else {
            return null; // ou une valeur par défaut appropriée si aucun sondage n'est trouvé
        }
    }
    @GetMapping("/filterBy/{minAge}/{maxAge}")
    public ResponseEntity<List<User>> filtrerParAge(
            @PathVariable("minAge") int minAge,
            @PathVariable("maxAge") int maxAge) {
        List<User> utilisateursFiltres = userService.filtrerParAge(minAge, maxAge);
        return ResponseEntity.ok(utilisateursFiltres);
    }

    @GetMapping("/filterBy/{gender}")
    public ResponseEntity<List<User>> filtrerParSexe(
            @PathVariable("gender") Gender gender) {
        List<User> utilisateursFiltres = userService.filtrerParSexe(gender);
        return ResponseEntity.ok(utilisateursFiltres);
    }
}