package com.app.bank.controllers;

import java.util.Collections;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.bank.models.dto.UsuariosDTO;
import com.app.bank.services.UsuariosService;

@RestController
@RequestMapping("/api/v1")
public class UsuariosController {

    @Autowired
    private UsuariosService usuariosService;

    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuariosDTO>> getUsuarios(){
        return ResponseEntity.ok(usuariosService.getUsuarios());
    }

    @GetMapping("/usuario")
    public ResponseEntity<UsuariosDTO> getUsuario(){
        return ResponseEntity.ok(usuariosService.getUsuario());
    }




}
