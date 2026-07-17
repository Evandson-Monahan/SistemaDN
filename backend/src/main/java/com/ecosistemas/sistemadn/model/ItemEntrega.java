package com.ecosistemas.sistemadn.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "itens_entrega")
public class ItemEntrega {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "entrega_id", nullable = false)
    private EntregaEquipamento entrega;

    @Column(nullable = false)
    private String patrimonio;

    @Column(nullable = false)
    private String equipamento;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private String modelo;

    @Column(nullable = false)
    private String setorAlocado;

    @Column(nullable = false)
    private String verificado;

}