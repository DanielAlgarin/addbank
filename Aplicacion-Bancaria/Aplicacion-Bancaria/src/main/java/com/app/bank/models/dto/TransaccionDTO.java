package com.app.bank.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransaccionDTO {
    private CuentasDTO origen;
    private CuentasDTO destino;
    private double monto;
}
