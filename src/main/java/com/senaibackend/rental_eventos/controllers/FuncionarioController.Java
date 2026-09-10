package com.senaibackend.rental_eventos.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.senaibackend.rental_eventos.models.Funcionario;
import com.senaibackend.rental_eventos.services.FuncionarioService;
import com.senaibackend.rental_eventos.dto.LoginRequest;

@RestController
@RequestMapping("/funcionario")
@CrossOrigin(origins = "*")
public class FuncionarioController {

    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @PostMapping("/cadastro")
    public ResponseEntity<Funcionario> cadastrar(
            @RequestBody Funcionario funcionario) {

        Funcionario novoFuncionario =
                funcionarioService.cadastrar(funcionario);

        return ResponseEntity.ok(novoFuncionario);
    }

    @PostMapping("/login")
    public ResponseEntity<Funcionario> login(
            @RequestBody LoginRequest loginRequest) {

        Funcionario funcionario = funcionarioService.login(
                loginRequest.getNome(),
                loginRequest.getSenha(),
                loginRequest.getSetor()
        );

        return ResponseEntity.ok(funcionario);
    }

    // TESTE TEMPORÁRIO
    @GetMapping("/teste")
    public String teste() {
        return "FuncionarioController está funcionando!";
    }
}