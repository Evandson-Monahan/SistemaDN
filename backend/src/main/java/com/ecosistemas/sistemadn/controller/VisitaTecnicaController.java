package com.ecosistemas.sistemadn.controller;

import com.ecosistemas.sistemadn.model.VisitaTecnica;
import com.ecosistemas.sistemadn.service.VisitaTecnicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class VisitaTecnicaController {

    @Autowired
    private VisitaTecnicaService visitaTecnicaService;

    @PostMapping("/visita")
    public ResponseEntity<Object> salvarVisita(@RequestBody Map<String, Object> dados) {
        try {
            VisitaTecnica visita = visitaTecnicaService.salvar(dados);
            return ResponseEntity.ok(visita);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar a visita técnica: " + e.getMessage());
        }
    }

}