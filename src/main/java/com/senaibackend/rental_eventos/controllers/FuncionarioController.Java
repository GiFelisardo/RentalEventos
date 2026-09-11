package com.senaibackend.rental_eventos.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.senaibackend.rental_eventos.models.Funcionario;
import com.senaibackend.rental_eventos.service.FuncionarioService;
import com.senaibackend.rental_eventos.dto.LoginRequest;
import com.senaibackend.rental_eventos.service.FuncionarioService;

@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {

    @Autowired 
    private FuncionarioService funcionarioService;

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

    @GetMapping("/perfil")
    public ResponseEntity<String> perfil() {
        return ResponseEntity.ok("Você está autenticado!");

        @PostMapping("/login")
public ResponseEntity<Funcionario> login(
        @RequestBody LoginRequest loginRequest) {

    Funcionario funcionario = funcionarioService.login(
            loginRequest.getNome(),
            loginRequest.getSenha()
    );

    return ResponseEntity.ok(funcionario);
}
    }
}
