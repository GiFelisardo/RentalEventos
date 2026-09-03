package com.senaibackend.rental_eventos.controllers;

import com.senaibackend.rental_eventos.models.Estoque;
import com.senaibackend.rental_eventos.repositories.EstoqueRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estoque")
@CrossOrigin(origins = "*")
public class EstoqueController {

    private final EstoqueRepository repository;

    public EstoqueController(EstoqueRepository repository) {
        this.repository = repository;
    }


    // LISTAR MOVIMENTAÇÕES
    @GetMapping
    public List<Estoque> listar() {
        return repository.findAll();
    }


    // REGISTRAR MOVIMENTAÇÃO
    @PostMapping
    public Estoque registrar(@RequestBody Estoque estoque) {

        return repository.save(estoque);
    }


    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Estoque buscar(@PathVariable Integer id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Movimentação não encontrada"));
    }
}
