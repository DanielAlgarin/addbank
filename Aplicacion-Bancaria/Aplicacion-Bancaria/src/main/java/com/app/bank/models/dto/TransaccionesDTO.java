package com.app.bank.models.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransaccionesDTO {
    private int id;
    private double monto;
    private LocalDateTime fecha;
}
