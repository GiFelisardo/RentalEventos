package com.senaibackend.rental_eventos.controllers;

import com.senaibackend.rental_eventos.models.Equipamento;
import com.senaibackend.rental_eventos.repositories.*;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipamentos")
@CrossOrigin(origins = "*")
public class EquipamentoController {

    private final EquipamentoRepository repository;

    public EquipamentoController(EquipamentoRepository repository) {
        this.repository = repository;
    }

    // LISTAR
    @GetMapping
    public List<Equipamento> listar() {
        return repository.findAll();
    }

    // CADASTRAR
    @PostMapping
    public Equipamento cadastrar(@RequestBody Equipamento equipamento) {
        return repository.save(equipamento);
    }

    // BUSCAR POR ID
    @GetMapping("/{id}")
    public Equipamento buscar(@PathVariable Integer id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Equipamento não encontrado"));
    }

    // EDITAR
    @PutMapping("/{id}")
    public Equipamento editar(
            @PathVariable Integer id,
            @RequestBody Equipamento dados) {

        Equipamento equipamento = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Equipamento não encontrado"));

        equipamento.setMarca(dados.getMarca());
        equipamento.setModelo(dados.getModelo());
        equipamento.setCategoria(dados.getCategoria());
        equipamento.setPotencia(dados.getPotencia());
        equipamento.setMaterial(dados.getMaterial());
        equipamento.setPeso(dados.getPeso());
        equipamento.setDimensoes(dados.getDimensoes());
        equipamento.setCor(dados.getCor());
        equipamento.setQuantidadeDisponivel(
                dados.getQuantidadeDisponivel());
        equipamento.setQuantidadeMinima(
                dados.getQuantidadeMinima());

        return repository.save(equipamento);
    }

    // EXCLUIR
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Integer id) {

        repository.deleteById(id);
    }
}
