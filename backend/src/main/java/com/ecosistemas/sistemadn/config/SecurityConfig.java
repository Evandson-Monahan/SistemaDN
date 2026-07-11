package com.ecosistemas.sistemadn.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/login").permitAll()
                        .requestMatchers("/api/sms").permitAll()
                        .requestMatchers("/api/unidades/**").permitAll()
                        .requestMatchers("/api/visita").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }

}