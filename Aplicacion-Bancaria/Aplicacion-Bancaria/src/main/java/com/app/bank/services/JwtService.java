package com.app.bank.services;

import java.util.Map;
import java.util.Date;
import java.security.Key;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;

import com.app.bank.models.entities.Usuarios;

public interface JwtService {
    String generateToken(Usuarios user, Map<String, Object> extraClaims);
    Key generateKey();
    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);
    String extractUsername(String token);
    boolean isTokenValid(String token, UserDetails userDetails);
    boolean isTokenExpired(String token);
    Date extractExpiration(String token);
    Claims extractAllClaims(String token);
}
