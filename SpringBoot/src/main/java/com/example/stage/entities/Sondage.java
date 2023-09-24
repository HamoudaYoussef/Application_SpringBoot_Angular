package com.example.stage.entities;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Sondage {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String nomsondage;
    private String description;
    private String lien;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private int minage;
    private int maxage;
    private int nbr_participant;
    private int cout;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "entreprise_id")
    private Entreprise entreprise;


}
