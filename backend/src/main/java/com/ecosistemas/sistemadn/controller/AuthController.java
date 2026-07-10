package com.ecosistemas.sistemadn.controller;

import com.ecosistemas.sistemadn.model.Usuario;
import com.ecosistemas.sistemadn.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credenciais) {

        String login = credenciais.get("login");
        String senha = credenciais.get("senha");

        boolean autenticado = usuarioService.autenticar(login, senha);

        if (autenticado) {
            Usuario usuario = usuarioService.buscarDadosDoUsuario(login);

            Map<String, Object> resposta = new HashMap<>();
            resposta.put("sucesso", true);
            resposta.put("nomeExibicao", usuario.getNomeExibicao());
            resposta.put("nomeCompleto", usuario.getNomeCompleto());
            resposta.put("nomeMovidesk", usuario.getNomeMovidesk());
            resposta.put("cargo", usuario.getCargo());
            resposta.put("usuarioId", usuario.getId());

            return ResponseEntity.ok(resposta);
        } else {
            Map<String, Object> resposta = new HashMap<>();
            resposta.put("sucesso", false);
            resposta.put("mensagem", "Login ou senha inválidos.");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resposta);
        }

    }

}