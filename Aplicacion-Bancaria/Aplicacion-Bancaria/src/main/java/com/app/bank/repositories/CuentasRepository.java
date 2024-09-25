package com.app.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.bank.models.entities.Cuentas;

@Repository
public interface CuentasRepository extends JpaRepository<Cuentas, Integer> {
    Cuentas findByNumeroCuenta(int numeroCuenta);
    Cuentas findByUsuarioId(int id);
    boolean existsByNumeroCuenta(int numeroCuenta);
}
