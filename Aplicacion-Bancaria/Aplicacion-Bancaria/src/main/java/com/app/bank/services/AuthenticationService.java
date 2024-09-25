package com.app.bank.services;


import java.util.Map;
import com.app.bank.models.dto.AuthenticationResponseDTO;
import com.app.bank.models.dto.LoginDTO;
import com.app.bank.models.dto.RegisterDTO;
import com.app.bank.models.entities.Usuarios;

public interface AuthenticationService {
    AuthenticationResponseDTO login(LoginDTO login);
    Map<String, Object> generateExtraClaims(Usuarios user);
    void register(RegisterDTO register);
}
