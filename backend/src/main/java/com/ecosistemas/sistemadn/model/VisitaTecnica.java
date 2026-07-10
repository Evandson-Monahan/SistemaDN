package com.ecosistemas.sistemadn.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "visitas_tecnicas")
public class VisitaTecnica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "unidade_saude_id", nullable = false)
    private UnidadeSaude unidadeSaude;

    @Column(nullable = false)
    private String numeroTicket;

    @Column(nullable = false)
    private String tituloTicket;

    @Column(columnDefinition = "TEXT")
    private String corpoTicket;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String estadoEquipamento;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String servicosRealizados;

    @Column(columnDefinition = "TEXT")
    private String avaliacaoCliente;

    @Column(nullable = false)
    private String nomeCliente;

    @Column(nullable = false)
    private String funcaoCliente;

    @Column(nullable = false)
    private String setorAtendido;

    @Column(nullable = false)
    private String produto;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] assinatura;

    @Column(nullable = false)
    private LocalDateTime dataHoraAtendimento;

}