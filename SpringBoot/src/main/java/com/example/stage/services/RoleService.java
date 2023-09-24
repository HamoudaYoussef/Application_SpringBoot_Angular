package com.example.stage.services;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.Role;
import com.example.stage.entities.User;
import com.example.stage.repositories.EntrepriseRepository;
import com.example.stage.repositories.RoleRepository;
import com.example.stage.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements IRoleService{
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    EntrepriseRepository entrepriseRepository;
    public void AffectRoleIdToUser(Long role_id, User u){
        Role role = roleRepository.findById(role_id).orElse(null); // Chercher le rôle par ID

        if (role != null) {
            u.setRole(role); // Affecter le rôle à l'utilisateur
            userRepository.save(u); // Enregistrer les modifications dans la base de données
        } else {
            // Gérer le cas où le rôle n'a pas été trouvé
            System.out.println("Le rôle avec l'ID " + role_id + " n'a pas été trouvé.");
        }
    }
    public void AffectRoleIdToEntreprise(Long role_id, Entreprise e){
        Role role = roleRepository.findById(role_id).orElse(null); // Chercher le rôle par ID

        if (role != null) {
            e.setRole(role); // Affecter le rôle à l'utilisateur
            entrepriseRepository.save(e); // Enregistrer les modifications dans la base de données
        } else {
            // Gérer le cas où le rôle n'a pas été trouvé
            System.out.println("Le rôle avec l'ID " + role_id + " n'a pas été trouvé.");
        }
    }
}
