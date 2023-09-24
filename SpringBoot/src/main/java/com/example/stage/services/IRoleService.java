package com.example.stage.services;

import com.example.stage.entities.Entreprise;
import com.example.stage.entities.User;

public interface IRoleService {
    void AffectRoleIdToUser(Long role_id, User u);
    void AffectRoleIdToEntreprise(Long role_id, Entreprise e);
}
