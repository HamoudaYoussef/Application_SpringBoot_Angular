package com.example.stage.services;

import com.example.stage.config.EmailAlreadyExistsException;
import com.example.stage.entities.Entreprise;
import com.example.stage.entities.Role;
import com.example.stage.entities.User;
import com.example.stage.repositories.EntrepriseRepository;
import com.example.stage.repositories.RoleRepository;
import com.example.stage.repositories.UserRepository;
import com.example.stage.security.AuthenticationRequest;
import com.example.stage.security.AuthenticationResponse;
import com.example.stage.security.RegisterRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.hibernate.usertype.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    EntrepriseRepository entrepriseRepository;


    private final JavaMailSender javaMailSender;
    private final RoleService roleService;

    @Autowired
    RoleRepository roleRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;
    private final IJwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(Entreprise e, User u) throws MessagingException {
        if (entrepriseRepository.findByEmail(e.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

      //  Role predefinedRole = roleRepository.findById(2L)
            //    .orElseThrow(() -> new UsernameNotFoundException("Predefined role not found"));

        var entreprise = Entreprise.builder()
                .companyname(e.getCompanyname())
                .email(e.getEmail())
                .password(passwordEncoder.encode(e.getPassword()))
                .build();
     //   user.setRoles(Collections.singleton(predefinedRole));
        entreprise.setEnabled(false);
        entrepriseRepository.save(entreprise);
        Map<String, Object> claims = new HashMap<>();

        roleService.AffectRoleIdToEntreprise(2L,entreprise);
        String role_id=entreprise.getRole().getId().toString();
        claims.put("role",role_id );
        String companyname = entreprise.getCompanyname();
        claims.put("companyname" , companyname);

        var jwtToken = jwtService.generateToken(claims, entreprise);
        String link = "http://localhost:8000/stage/auth/confirmEntreprise?token=" + jwtToken;
        sendMail(u,entreprise,link);
        return AuthenticationResponse.builder().token(jwtToken)
                .build();
    }

   @Override
    public AuthenticationResponse registerCitoyen(RegisterRequest request,Entreprise e) throws MessagingException {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        //  Role predefinedRole = roleRepository.findById(2L)
        //    .orElseThrow(() -> new UsernameNotFoundException("Predefined role not found"));

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .gender(request.getGender())
                .build();
        //   user.setRoles(Collections.singleton(predefinedRole));
        user.setEnabled(false);
        userRepository.save(user);

        Map<String, Object> claims = new HashMap<>();

        roleService.AffectRoleIdToUser(3L,user);
        String role_id=user.getRole().getId().toString();
        claims.put("role",role_id );
        String firstname = user.getFirstname();
        claims.put("firstname" , firstname);
        String lastname = user.getLastname();
        claims.put("lastname" , lastname);

       /* String lastname = user.getFirstname();
        claims.put("lastname" , lastname);
        int phone = user.getPhone();
        claims.put("phone" , phone);
*/
        var jwtToken = jwtService.generateToken(claims, user);
       String link = "http://localhost:8000/stage/auth/confirm?token=" + jwtToken;
       sendMail(user,e,link);
        return AuthenticationResponse.builder().token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authRequest) {
        var user = userRepository.findByEmail(authRequest.getEmail()).orElse(null);
        var entreprise = entrepriseRepository.findByEmail(authRequest.getEmail()).orElse(null);

        if (user != null && user.isEnabled() && passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

            Map<String, Object> claims = new HashMap<>();
            String role_id = user.getRole().getId().toString();
            claims.put("role", role_id);
            String firstname = user.getFirstname();
            claims.put("firstname", firstname);
            String lastname = user.getLastname();
            claims.put("lastname", lastname);

            var jwtToken = jwtService.generateToken(claims, user);
            return AuthenticationResponse.builder().token(jwtToken).build();
        } else if (entreprise != null && entreprise.isEnabled() && passwordEncoder.matches(authRequest.getPassword(), entreprise.getPassword())) {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

            Map<String, Object> claims = new HashMap<>();
            String role_id = entreprise.getRole().getId().toString();
            claims.put("role", role_id);
            String companyname = entreprise.getCompanyname();
            claims.put("companyname", companyname);

            var jwtTokenE = jwtService.generateToken(claims, entreprise);
            return AuthenticationResponse.builder().token(jwtTokenE).build();
        }
            String errorMessage = "Invalid Credentials";
            return AuthenticationResponse.builder().errorMessage(errorMessage).build();
    }
public void sendMail(User user,Entreprise e, String link) throws MessagingException {
 String name;
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "utf-8");
    messageHelper.setFrom("sonda99ge@gmail.com");
    if(user.getUsername() != null){
        messageHelper.setTo(user.getEmail());
        name=user.getUsername();
    }else{
        messageHelper.setTo(e.getEmail());
        name=e.getCompanyname();
    }
    String emailContent = "<html>"
            + "<body>"
            + "<p>Hi " + name + ",</p>"
            + "<p>Thank you for registering. Please click on the below link to activate your account:</p>"
            + "<p><a href=\"" + link + "\">Activate Now</a></p>"
            + "<p>Link will expire in 15 minutes. See you soon.</p>"
            + "</body>"
            + "</html>";
    messageHelper.setSubject("Verification du Compte");
    messageHelper.setText(emailContent, true); // The true argument indicates HTML content

    javaMailSender.send(mimeMessage);
}
/*private String body(User user){
        return "Hi" + user.getFirstname()+ " "+user.getLastname() + "you have to click in this link to confirm your account" +


}
*/
}
