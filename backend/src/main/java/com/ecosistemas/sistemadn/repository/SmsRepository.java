package com.ecosistemas.sistemadn.repository;

import com.ecosistemas.sistemadn.model.Sms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmsRepository extends JpaRepository<Sms, Long> {

}