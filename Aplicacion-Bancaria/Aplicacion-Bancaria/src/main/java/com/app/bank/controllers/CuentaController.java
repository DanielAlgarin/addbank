package com.app.bank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.app.bank.models.dto.CuentaRequestDTO;
import com.app.bank.models.dto.OperacionCuentaDTO;
import com.app.bank.models.dto.TransferirDTO;
import com.app.bank.services.CuentasService;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class CuentaController {
    @Autowired
    private CuentasService cuentasService;

    @CrossOrigin(origins = "*")
    @GetMapping("/saldo")
    public ResponseEntity<Map<String, Double>> getSaldo() {
        return ResponseEntity.ok(cuentasService.getSaldo());
    }

    @PostMapping("/retirar")
    public void retirar(@RequestBody OperacionCuentaDTO retiro){
        cuentasService.retirar(retiro);
    }

    @PostMapping("/deposito")
    public void deposito(@RequestBody OperacionCuentaDTO deposito){
        cuentasService.depositar(deposito);
    }

    @PostMapping("/transferir")
    public void transferir(@RequestBody TransferirDTO transferirDTO){
        cuentasService.transferir(transferirDTO);
    }

}
