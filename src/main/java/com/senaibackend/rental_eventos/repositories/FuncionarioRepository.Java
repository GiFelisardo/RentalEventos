package com.senaibackend.rental_eventos.repositories;

import java.util.Optional;

import org.springframework.stereotype.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.senaibackend.rental_eventos.models.Funcionario;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Optional<Funcionario> findByNome(String nome);

    boolean existsByNome(String nome);
}