package com.ecosistemas.sistemadn.controller;

import com.ecosistemas.sistemadn.model.Sms;
import com.ecosistemas.sistemadn.model.UnidadeSaude;
import com.ecosistemas.sistemadn.service.UnidadeSaudeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UnidadeSaudeController {

    @Autowired
    private UnidadeSaudeService unidadeSaudeService;

    @GetMapping("/sms")
    public List<Sms> listarTodosSms() {
        return unidadeSaudeService.listarTodosSms();
    }

    @GetMapping("/unidades/{smsId}")
    public List<UnidadeSaude> listarUnidadesPorSms(@PathVariable Long smsId) {
        return unidadeSaudeService.listarUnidadesPorSms(smsId);
    }

}