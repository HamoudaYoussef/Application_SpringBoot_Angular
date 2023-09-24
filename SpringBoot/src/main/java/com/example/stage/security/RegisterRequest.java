package com.example.stage.security;

import com.example.stage.entities.Gender;
import com.example.stage.entities.Role;
import jakarta.persistence.Entity;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    private String companyname;
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Gender gender;
    private Role role;
}
