package com.senaibackend.rental_eventos.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.senaibackend.rental_eventos.models.Estoque;
import com.senaibackend.rental_eventos.repositories.EstoqueRepository;
import com.senaibackend.rental_eventos.services.EstoqueService;

@RestController
@RequestMapping("/estoque")
@CrossOrigin(origins = "*")
public class EstoqueController {

    private final EstoqueRepository repository;
    private final EstoqueService service;

    public EstoqueController(
            EstoqueRepository repository,
            EstoqueService service) {

        this.repository = repository;
        this.service = service;
    }

    // =========================
    // LISTAR MOVIMENTAÇÕES
    // =========================

    @GetMapping
    public List<Estoque> listar() {

        return repository.findAll();
    }

    // =========================
    // REGISTRAR MOVIMENTAÇÃO
    // =========================

    @PostMapping
    public Estoque registrar(@RequestBody Estoque estoque) {

        return service.registrarMovimentacao(estoque);
    }

    // =========================
    // BUSCAR POR ID
    // =========================

    @GetMapping("/{id}")
    public Estoque buscar(@PathVariable Integer id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Movimentação não encontrada"
                        )
                );
    }
}