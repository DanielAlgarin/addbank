package com.app.bank.controllers;

import com.app.bank.models.dto.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.app.bank.models.dto.AuthenticationResponseDTO;
import com.app.bank.models.dto.LoginDTO;
import com.app.bank.services.AuthenticationService;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;


    @PostMapping("/login")
    @CrossOrigin(origins = "*")
    public ResponseEntity<AuthenticationResponseDTO> login( @RequestBody LoginDTO login){
        AuthenticationResponseDTO jwt = authenticationService.login(login);
        return ResponseEntity.ok(jwt);                                  
    }


    @PostMapping("/register")
    public void register(@RequestBody RegisterDTO registerDTO){
        authenticationService.register(registerDTO);
    }


}

