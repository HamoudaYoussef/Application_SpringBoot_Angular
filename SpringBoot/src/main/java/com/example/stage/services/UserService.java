package com.example.stage.services;

import com.example.stage.entities.*;
import com.example.stage.repositories.ParticipationRepository;
import com.example.stage.repositories.UserCorrespondaceRepository;
import com.example.stage.repositories.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserCorrespondaceRepository userCorrespondaceRepository;
    @Autowired
    ParticipationRepository participationRepository;
    private final JavaMailSender javaMailSender;


    @Autowired
    IJwtService jwtService;

    @Autowired
    ISondageService sondageService;

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email).get();
    }

   public boolean getEnbabled(User user){
        user.setEnabled(true);
        userRepository.save(user);
        return true;
   }
    public User getUserByToken(@NonNull HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;
        jwt = authHeader.substring(7);
        userEmail = jwtService.extractUserEmail(jwt);

        return userRepository.findByEmail(userEmail).get();
    }


    @Override
    public List<User> getRandomUsers(Long IdSondage) throws MessagingException {
       Sondage sondage=sondageService.getSondageById(IdSondage);
        Participation participation = new Participation();
        List<User> filteredUsersByGender = filtrerParSexe(sondage.getGender());
        List<User> filteredUsersByAge = filtrerParAge(sondage.getMinage(),sondage.getMaxage());
        List<User> filteredUsers = filteredUsersByGender.stream()
                .filter(filteredUsersByAge::contains)
                .collect(Collectors.toList());

        Collections.shuffle(filteredUsers);
        List<User> selectedUsers = filteredUsers.subList(0, Math.min(sondage.getNbr_participant(), filteredUsers.size()));
        for(User user:selectedUsers){

            String userHash = generateUniqueHash(user.getId().toString());
            UserCorrespondace correspondence = new UserCorrespondace();
            correspondence.setOriginaluserid(user.getId().toString());

            correspondence.setHasheduserid(userHash);
            // Construire le lien unique pour chaque utilisateur avec le code haché de l'userId
            String link = "http://localhost:4200/afficher-sondage/" + sondage.getLien() + "/" + userHash;
            // Envoyer l'e-mail à l'utilisateur avec le lien
            sendMailUser(user, link);

            userCorrespondaceRepository.save(correspondence);
            participation.setUser(user);
            participation.setSondage(sondage);
            participation.setEtat(false);
            participationRepository.save(participation);
            // Enregistrez la participation dans la base de données
        }

        return selectedUsers;
    }
    public List<User> filtrerParAge(int minAge, int maxAge) {
        return userRepository.findByAgeBetween(minAge, maxAge);
    }

    public List<User> filtrerParSexe(Gender gender) {
        return userRepository.findByGender(gender);
    }

    @Override
   public void sendMailUser(User user, String link) throws MessagingException {
        String name = user.getUsername();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
        messageHelper.setFrom("sonda99ge@gmail.com");
        String emailContent = "<html>"
                + "<body>"
                + "<p>Hi " + name + ",</p>"
                + "<p>vous avez recu un sondage :</p>"
                + "<p><a href=\"" + link + "\">repondre au sondage </a></p>"
                + "<p>Link will expire in 15 minutes. See you soon.</p>"
                + "</body>"
                + "</html>";
        messageHelper.setSubject("Reponde au sondage");
        messageHelper.setTo(user.getEmail());
        messageHelper.setText(emailContent, true); // The true argument indicates HTML content

        javaMailSender.send(mimeMessage);
    }
    @Override
    public String getOriginalUserIdFromHashedId(String hashedUserId) {
        UserCorrespondace user = userCorrespondaceRepository.findByHasheduserid(hashedUserId);
        if (user != null) {
            return user.getOriginaluserid();
        } else {
            return null; // ou une valeur par défaut appropriée si aucun sondage n'est trouvé
        }
    }

     public String generateUniqueHash(String input) {
         try {
             MessageDigest md = MessageDigest.getInstance("SHA-256");
             SecureRandom random = new SecureRandom();
             byte[] salt = new byte[16];
             random.nextBytes(salt);

             byte[] inputBytes = input.getBytes();
             byte[] saltedInput = new byte[inputBytes.length + salt.length];

             System.arraycopy(inputBytes, 0, saltedInput, 0, inputBytes.length);
             System.arraycopy(salt, 0, saltedInput, inputBytes.length, salt.length);

             byte[] hashBytes = md.digest(saltedInput);

             StringBuilder hexString = new StringBuilder();
             for (byte hashByte : hashBytes) {
                 String hex = Integer.toHexString(0xff & hashByte);
                 if (hex.length() == 1) {
                     hexString.append('0');
                 }
                 hexString.append(hex);
             }

             return hexString.toString();
         } catch (NoSuchAlgorithmException e) {
             // Gestion de l'exception
             return null;
         }
    }
}
