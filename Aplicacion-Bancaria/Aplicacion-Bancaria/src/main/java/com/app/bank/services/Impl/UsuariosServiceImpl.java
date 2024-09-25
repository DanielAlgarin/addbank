package com.app.bank.services.Impl;

import java.util.ArrayList;
import java.util.List;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.app.bank.models.dto.CuentasDTO;
import com.app.bank.models.dto.UsuariosDTO;
import com.app.bank.models.entities.Cuentas;
import com.app.bank.models.entities.Usuarios;
import com.app.bank.repositories.UsuariosRepository;
import com.app.bank.services.UsuariosService;

@Service
public class UsuariosServiceImpl implements UsuariosService {

    @Autowired
    private UsuariosRepository usuariosRepository;

    private String secretKey = "UASIOFASFSAAsakfjkslaf034184?.*)\"/(/#$$?";

    @Override
    public List<UsuariosDTO> getUsuarios() {
        List<Usuarios> usuarios = usuariosRepository.findAll();
        List<UsuariosDTO> usuariosDTO = new ArrayList<>();

        for (Usuarios usuario : usuarios) {
            Cuentas cuenta = usuario.getCuenta();
            CuentasDTO cuentaDTO = new CuentasDTO(cuenta.getNumeroCuenta(), cuenta.getSaldo());

            UsuariosDTO usuarioDTO = new UsuariosDTO(
                    usuario.getId(),
                    usuario.getUsername(),
                    usuario.getPassword(),
                    cuentaDTO 
            );

            usuariosDTO.add(usuarioDTO); 
        }

        return usuariosDTO;
    }

    @Override
    public UsuariosDTO getUsuario() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Usuarios usuarioAutenticado = (Usuarios) auth.getPrincipal();

        Cuentas cuenta = usuarioAutenticado.getCuenta();
        CuentasDTO cuentasDTO = new CuentasDTO(cuenta.getNumeroCuenta(), cuenta.getSaldo());


        UsuariosDTO usuariosDTO = new UsuariosDTO();
        usuariosDTO.setId(usuarioAutenticado.getId());
        usuariosDTO.setPassword(usuarioAutenticado.getPassword());
        usuariosDTO.setUsername(usuarioAutenticado.getUsername());
        usuariosDTO.setCuenta(cuentasDTO);
        return usuariosDTO;

    }


    // @Override
    // public void transferir(TransferirDTO transferencia) {
    // Optional<Usuarios> usuarioOrigen =
    // usuariosRepository.findById(transferencia.getId());
    // Usuarios usuario = usuarioOrigen.get();
    // Cuentas cuentaDestino =
    // cuentasRepository.findByNumeroCuenta(transferencia.getCuentaDestino());
    // }

}
