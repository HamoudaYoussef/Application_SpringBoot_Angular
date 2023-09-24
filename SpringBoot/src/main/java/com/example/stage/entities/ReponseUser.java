package com.example.stage.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ReponseUser {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne(cascade = CascadeType.ALL) // Ajoutez cette annotation pour mapper la réponse à laquelle l'utilisateur a répondu
    @JoinColumn(name = "reponse_id")
    private Reponse reponse;
    @ManyToOne(cascade = CascadeType.ALL) // Ajoutez cette annotation pour mapper la réponse à laquelle l'utilisateur a répondu
    @JoinColumn(name = "sondage_id")
    private Sondage sondage;

}