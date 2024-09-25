package com.app.bank.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuariosDTO {
    private int id;
    private String username;
    private String password;
    private CuentasDTO cuenta;

    
}
