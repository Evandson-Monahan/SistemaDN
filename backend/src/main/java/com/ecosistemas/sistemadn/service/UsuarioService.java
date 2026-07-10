package com.ecosistemas.sistemadn.service;

import com.ecosistemas.sistemadn.model.Usuario;
import com.ecosistemas.sistemadn.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Optional<Usuario> buscarPorLogin(String login) {
        return usuarioRepository.findByLogin(login);
    }

    public boolean autenticar(String login, String senha) {
        Optional<Usuario> usuario = usuarioRepository.findByLogin(login);
        if (usuario.isPresent()) {
            return usuario.get().getSenha().equals(senha);
        }
        return false;
    }

    public Usuario buscarDadosDoUsuario(String login) {
        Optional<Usuario> usuario = usuarioRepository.findByLogin(login);
        if (usuario.isPresent()) {
            return usuario.get();
        }
        return null;
    }

}