package com.example.stage.services;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

public interface IJwtService {

    String extractUserEmail(String jwt);

    String generateToken(Map<String, Object> extraClaims, UserDetails userDetails);

    String generateSondageToken(Map<String, Object> extraClaims);

    Boolean isTokenExpired(String jwt);

    Date extractExpiration(String jwt);

    Boolean isTokenValid(String jwt, UserDetails userDetails);

    Claims extractAllClaims(String jwt);

    <T> T extractClaim(String jwt, Function<Claims, T> claimsResolver);

    Key getSignInKey();
}
