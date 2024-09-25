package com.app.bank.services;

import com.app.bank.models.dto.TransaccionDTO;

public interface TransaccionesService {
    void realizarTransaccion(TransaccionDTO transaccion);
}
