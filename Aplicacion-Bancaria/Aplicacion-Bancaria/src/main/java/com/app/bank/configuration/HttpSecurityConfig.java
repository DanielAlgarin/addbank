package com.app.bank.configuration;

import com.app.bank.models.entities.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.app.bank.configuration.filter.JwtAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collections;

@Configuration
@EnableWebSecurity
public class HttpSecurityConfig {
    
    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(sessionManagementCustomizer -> sessionManagementCustomizer
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(authorize -> {
                    authorize.requestMatchers(HttpMethod.POST, "/auth/login").permitAll();

                    authorize.requestMatchers(HttpMethod.POST, "/auth/register").permitAll();
                    authorize.requestMatchers(HttpMethod.GET, "/api/v1/usuario").authenticated();

                    authorize.requestMatchers(HttpMethod.GET, "/api/v1/usuarios").hasAuthority(Permission.CONSULTAR_TODAS_CUENTAS.name());
                    authorize.requestMatchers(HttpMethod.GET, "/api/v1/saldo").hasAuthority(Permission.CONSULTAR_SALDO.name());
                    authorize.requestMatchers(HttpMethod.POST, "/api/v1/deposito").hasAuthority(Permission.REALIZAR_DEPOSITO.name());
                    authorize.requestMatchers(HttpMethod.POST, "/api/v1/retirar").hasAuthority(Permission.REALIZAR_RETIRO.name());
                    authorize.requestMatchers(HttpMethod.POST, "/api/v1/transferir").hasAuthority(Permission.TRANSFERIR.name());



                    authorize.requestMatchers("/error").permitAll();

                    // authorize.requestMatchers(HttpMethod.GET, "/api/v1/products").permitAll();
                    // authorize.requestMatchers(HttpMethod.POST, "/api/v1/create").hasAuthority(Permission.SAVE_ONE_PRODUCT.name());

                    authorize.anyRequest().denyAll();
                })
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }



}
