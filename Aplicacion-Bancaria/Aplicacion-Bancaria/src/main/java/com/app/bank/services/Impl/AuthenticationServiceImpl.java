package com.app.bank.services.Impl;

import java.util.Map;
import java.util.HashMap;
import java.util.Random;
import java.util.UUID;

import com.app.bank.models.dto.RegisterDTO;
import com.app.bank.models.entities.Cuentas;
import com.app.bank.models.entities.Role;
import com.app.bank.repositories.CuentasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.bank.models.dto.AuthenticationResponseDTO;
import com.app.bank.models.dto.LoginDTO;
import com.app.bank.models.entities.Usuarios;
import com.app.bank.repositories.UsuariosRepository;
import com.app.bank.services.AuthenticationService;
import com.app.bank.services.JwtService;

@Service
public class AuthenticationServiceImpl implements AuthenticationService{

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuariosRepository iUserRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CuentasRepository cuentasRepository;

    @Override
    public AuthenticationResponseDTO login(LoginDTO login) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword());

        authenticationManager.authenticate(authToken);

        Usuarios user = iUserRepository.findByUsername(login.getUsername()).get();

        String jwt = jwtService.generateToken(user, generateExtraClaims(user));

        return new AuthenticationResponseDTO(jwt);
    }

    @Override
    public Map<String, Object> generateExtraClaims(Usuarios user) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("name", user.getUsername());
        extraClaims.put("role", user.getRole().name());
        return extraClaims;
    }

    @Override
    public void register(RegisterDTO registerDTO) {
        Usuarios nuevoUsuario = new Usuarios();
        nuevoUsuario.setUsername(registerDTO.getUsername());
        nuevoUsuario.setPassword(passwordEncoder.encode(registerDTO.getPassword())); // Encriptar la contraseña
        nuevoUsuario.setRole(Role.valueOf("USER"));

        // Guardar el nuevo usuario en la base de datos
        iUserRepository.save(nuevoUsuario);

        Cuentas cuenta = new Cuentas();
        cuenta.setSaldo(0.00);
        cuenta.setUsuario(nuevoUsuario);
        cuenta.setNumeroCuenta(generarNumeroCuentaUnico());

        cuentasRepository.save(cuenta);

    }

    private int generarNumeroCuentaUnico() {
        Random random = new Random();
        int numeroCuenta;
        do {
            // Genera un número aleatorio entre 1000000 y 9999999 (o el rango que prefieras)
            numeroCuenta = random.nextInt(9000000) + 1000000;
        } while (cuentasRepository.existsByNumeroCuenta(numeroCuenta));
        return numeroCuenta;
    }

}
