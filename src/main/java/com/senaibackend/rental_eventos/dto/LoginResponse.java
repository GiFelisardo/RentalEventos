package com.senaibackend.rental_eventos.dto;

public class LoginResponse {

    private Long id;
    private String nome;
    private String setor;
    private String turno;

    public LoginResponse(
            Long id,
            String nome,
            String setor,
            String turno) {

        this.id = id;
        this.nome = nome;
        this.setor = setor;
        this.turno = turno;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getSetor() {
        return setor;
    }

    public String getTurno() {
        return turno;
    }
}