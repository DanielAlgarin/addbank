package com.app.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.bank.models.entities.Usuarios;

import java.util.Optional;
@Repository
public interface UsuariosRepository extends JpaRepository<Usuarios, Integer>{
    Optional<Usuarios> findByUsername(String username);

}
