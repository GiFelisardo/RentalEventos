package com.senaibackend.rental_eventos.repositories;

import com.senaibackend.rental_eventos.models.Estoque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstoqueRepository extends JpaRepository<Estoque, Integer> {
}
