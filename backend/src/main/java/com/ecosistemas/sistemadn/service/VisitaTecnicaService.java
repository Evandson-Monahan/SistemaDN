package com.ecosistemas.sistemadn.service;

import com.ecosistemas.sistemadn.model.UnidadeSaude;
import com.ecosistemas.sistemadn.model.Usuario;
import com.ecosistemas.sistemadn.model.VisitaTecnica;
import com.ecosistemas.sistemadn.repository.UnidadeSaudeRepository;
import com.ecosistemas.sistemadn.repository.UsuarioRepository;
import com.ecosistemas.sistemadn.repository.VisitaTecnicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Map;
import java.util.Optional;

@Service
public class VisitaTecnicaService {

    @Autowired
    private VisitaTecnicaRepository visitaTecnicaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UnidadeSaudeRepository unidadeSaudeRepository;

    public VisitaTecnica salvar(Map<String, Object> dados) {

        Long usuarioId = Long.valueOf(dados.get("usuarioId").toString());
        Long unidadeSaudeId = Long.valueOf(dados.get("unidadeSaudeId").toString());

        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        Optional<UnidadeSaude> unidadeOpt = unidadeSaudeRepository.findById(unidadeSaudeId);

        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado.");
        }

        if (unidadeOpt.isEmpty()) {
            throw new RuntimeException("Unidade de saúde não encontrada.");
        }

        VisitaTecnica visita = new VisitaTecnica();

        visita.setUsuario(usuarioOpt.get());
        visita.setUnidadeSaude(unidadeOpt.get());
        visita.setNumeroTicket(dados.get("numeroTicket").toString());
        visita.setTituloTicket(dados.get("tituloTicket").toString());
        visita.setCorpoTicket(dados.get("corpoTicket").toString());
        visita.setEstadoEquipamento(dados.get("estadoEquipamento").toString());
        visita.setServicosRealizados(dados.get("servicosRealizados").toString());
        visita.setNomeCliente(dados.get("nomeCliente").toString());
        visita.setFuncaoCliente(dados.get("funcaoCliente").toString());
        visita.setSetorAtendido(dados.get("setorAtendido").toString());
        visita.setProduto(dados.get("produto").toString());
        visita.setDataHoraAtendimento(LocalDateTime.now());

        // Avaliação do cliente é opcional
        if (dados.get("avaliacaoCliente") != null) {
            visita.setAvaliacaoCliente(dados.get("avaliacaoCliente").toString());
        }

        // Converte a assinatura de Base64 para bytes e salva
        String assinaturaBase64 = dados.get("assinatura").toString();
        String assinaturaLimpa = assinaturaBase64.replace("data:image/png;base64,", "");
        byte[] assinaturaBytes = Base64.getDecoder().decode(assinaturaLimpa);
        visita.setAssinatura(assinaturaBytes);

        return visitaTecnicaRepository.save(visita);

    }

}