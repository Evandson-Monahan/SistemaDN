package com.ecosistemas.sistemadn.service;

import com.ecosistemas.sistemadn.model.Sms;
import com.ecosistemas.sistemadn.model.UnidadeSaude;
import com.ecosistemas.sistemadn.repository.SmsRepository;
import com.ecosistemas.sistemadn.repository.UnidadeSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UnidadeSaudeService {

    @Autowired
    private SmsRepository smsRepository;

    @Autowired
    private UnidadeSaudeRepository unidadeSaudeRepository;

    public List<Sms> listarTodosSms() {
        return smsRepository.findAll();
    }

    public List<UnidadeSaude> listarUnidadesPorSms(Long smsId) {
        return unidadeSaudeRepository.findBySmsId(smsId);
    }

}