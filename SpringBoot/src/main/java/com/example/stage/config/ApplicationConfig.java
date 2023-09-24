package com.example.stage.config;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.User;
import com.example.stage.repositories.EntrepriseRepository;
import com.example.stage.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    @Autowired
    UserRepository userRepository;
    @Autowired
    EntrepriseRepository entrepriseRepository;


    private final static String USER_NOT_FOUND ="User with email %email not found";

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> {
            User user = userRepository.findByEmail(email)
                    .orElse(null); // We'll handle this below

            Entreprise enterprise = entrepriseRepository.findByEmail(email)
                    .orElse(null); // We'll handle this below

            if (user == null && enterprise == null) {
                throw new UsernameNotFoundException(USER_NOT_FOUND);
            }

            if (user != null) {
                // Perform user-specific operations if necessary
                return user;
            }

            if (enterprise != null) {
                // Perform enterprise-specific operations if necessary
                return enterprise;
            }

            throw new UsernameNotFoundException(USER_NOT_FOUND);
        };
    }


    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
