package com.senaibackend.rental_eventos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.senaibackend.rental_eventos.models.Equipamento;

@Repository 
public interface EquipamentoRepository 
        extends JpaRepository<Equipamento, Integer> {
}
