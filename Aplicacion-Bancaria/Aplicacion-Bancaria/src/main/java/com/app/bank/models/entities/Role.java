package com.app.bank.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;

@Getter
@AllArgsConstructor
public enum Role {
    USER (Arrays.asList(Permission.CONSULTAR_SALDO, Permission.TRANSFERIR, Permission.REALIZAR_DEPOSITO, Permission.REALIZAR_RETIRO)),
    ADMIN   (Arrays.asList(Permission.CONSULTAR_SALDO, Permission.CONSULTAR_TODAS_CUENTAS));

    private List<Permission> permissions;




}
