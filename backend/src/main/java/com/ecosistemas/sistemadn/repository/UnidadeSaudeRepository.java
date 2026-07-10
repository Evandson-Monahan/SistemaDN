package com.ecosistemas.sistemadn.repository;

import com.ecosistemas.sistemadn.model.UnidadeSaude;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UnidadeSaudeRepository extends JpaRepository<UnidadeSaude, Long> {

    List<UnidadeSaude> findBySmsId(Long smsId);

}