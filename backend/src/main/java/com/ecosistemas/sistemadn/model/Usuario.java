package com.ecosistemas.sistemadn.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String login;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String nomeCompleto;

    @Column(nullable = false)
    private String nomeMovidesk;

    @Column(nullable = false)
    private String nomeExibicao;

    @Column(nullable = false)
    private String cargo;

}