package com.ecosistemas.sistemadn.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "sms")
public class Sms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

}