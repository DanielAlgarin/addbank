package com.app.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.bank.models.entities.Transacciones;

@Repository
public interface TransaccionesRepository extends JpaRepository<Transacciones, Integer>{
    

}
