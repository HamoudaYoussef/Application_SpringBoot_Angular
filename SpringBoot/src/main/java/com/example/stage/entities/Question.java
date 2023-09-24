package com.example.stage.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Question {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private String titre;



    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "sondage_id")
    private Sondage sondage;
    private  Integer nbO;
    private Integer nbN;

}
