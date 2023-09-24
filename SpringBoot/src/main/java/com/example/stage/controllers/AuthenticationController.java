package com.example.stage.controllers;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.User;
import com.example.stage.security.AuthenticationRequest;
import com.example.stage.security.AuthenticationResponse;
import com.example.stage.security.RegisterRequest;
import com.example.stage.services.IAuthenticationService;
import com.example.stage.services.IEntrepriseService;
import com.example.stage.services.IJwtService;
import com.example.stage.services.IUserService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthenticationController {

    @Autowired
    private IAuthenticationService authenticationService;

    @Autowired
    private IJwtService jwtService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IEntrepriseService entrepriseService;




    @PostMapping("/register")
    @Transactional
    public ResponseEntity<AuthenticationResponse> register(@RequestBody Entreprise e,User u) throws MessagingException {
        //request.getRole().setType("entreprise");
        return ResponseEntity.ok(authenticationService.register(e,u)) ;
    }
    @PostMapping("/registerCitoyen")
    @Transactional
    public ResponseEntity<AuthenticationResponse> registerCitoyen(@RequestBody RegisterRequest request,Entreprise e) throws MessagingException {
        return ResponseEntity.ok(authenticationService.registerCitoyen(request,e)) ;
    }

    @PostMapping("/authenticate")
    @Transactional
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @GetMapping( "/confirm")
    public ResponseEntity<String> confirm(@RequestParam("token") String token) {
        // Extraire l'adresse e-mail à partir du token (si c'est possible selon votre génération)
        String userEmail = jwtService.extractUserEmail(token);
        // Vérifier si l'adresse e-mail existe dans la base de données
        User user = userService.getUserByEmail(userEmail);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
        else {
            userService.getEnbabled(user);
            // Redirect to the Angular route after successful confirmation
            String redirectUrl = "http://localhost:4200/authentication"; // Replace with your Angular route URL
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", redirectUrl);
            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        }
    }

    @GetMapping( "/confirmEntreprise")
    public ResponseEntity<String> confirmE(@RequestParam("token") String token) {
        // Extraire l'adresse e-mail à partir du token (si c'est possible selon votre génération)
        String userEmail = jwtService.extractUserEmail(token);

        // Vérifier si l'adresse e-mail existe dans la base de données

        Entreprise entreprise = entrepriseService.getEntrepriseByEmail(userEmail);
        if ( entreprise == null ) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
        else {
            if( entreprise != null){
                entrepriseService.getEnbabled(entreprise);
            }
            // Redirect to the Angular route after successful confirmation
            String redirectUrl = "http://localhost:4200/authentication"; // Replace with your Angular route URL
            HttpHeaders headers = new HttpHeaders();
            headers.add("Location", redirectUrl);
            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        }
        /*  return     ResponseEntity.ok().body("Successes");*/
    }

}
