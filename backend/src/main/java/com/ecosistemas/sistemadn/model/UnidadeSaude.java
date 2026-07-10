package com.ecosistemas.sistemadn.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "unidades_saude")
public class UnidadeSaude {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT")
    private String aliases;

    @ManyToOne
    @JoinColumn(name = "sms_id", nullable = false)
    private Sms sms;

}