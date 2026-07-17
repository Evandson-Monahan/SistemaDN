package com.ecosistemas.sistemadn.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "entregas_equipamentos")
public class EntregaEquipamento {

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

    @Column(nullable = false)
    private String nomeCliente;

    @Column(nullable = false)
    private String funcaoCliente;

    @Column(nullable = false)
    private String setorAtendido;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] assinatura;

    @Column(nullable = false)
    private LocalDateTime dataHoraAtendimento;

    @OneToMany(mappedBy = "entrega", cascade = CascadeType.ALL)
    private List<ItemEntrega> itens;

}