package com.app.bank.services;

import com.app.bank.models.dto.CuentaRequestDTO;
import com.app.bank.models.dto.OperacionCuentaDTO;
import com.app.bank.models.dto.TransferirDTO;

import java.util.Map;

public interface CuentasService {
    void depositar(OperacionCuentaDTO monto);
    void retirar(OperacionCuentaDTO monto);
    Map<String, Double> getSaldo();
    void transferir(TransferirDTO transferencia);
}
