package com.ecosistemas.sistemadn.repository;

import com.ecosistemas.sistemadn.model.VisitaTecnica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VisitaTecnicaRepository extends JpaRepository<VisitaTecnica, Long> {

}