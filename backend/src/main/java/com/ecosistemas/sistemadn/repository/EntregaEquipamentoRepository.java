package com.ecosistemas.sistemadn.repository;

import com.ecosistemas.sistemadn.model.EntregaEquipamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntregaEquipamentoRepository extends JpaRepository<EntregaEquipamento, Long> {

}