package com.app.bank.services;

import java.util.List;

import com.app.bank.models.dto.UsuariosDTO;

public interface UsuariosService {
    List<UsuariosDTO> getUsuarios();
    UsuariosDTO getUsuario();
}
