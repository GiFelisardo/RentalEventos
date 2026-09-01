package com.senaibackend.rental_eventos.repositories;

import com.senaibackend.rental_eventos.models.Equipamento; 
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipamentoRepository 
        extends JpaRepository<Equipamento, Integer> {
}
