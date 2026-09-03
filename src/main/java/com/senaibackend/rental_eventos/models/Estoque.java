package com.senaibackend.rental_eventos.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "estoque")
public class Estoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "equipamentosid", nullable = false)
    private Integer equipamentosId;

    @Column(name = "entrada")
    private LocalDateTime entrada;

    @Column(name = "saida")
    private LocalDateTime saida;

    @Column(name = "funcionarioid", nullable = false)
    private Integer funcionarioId;

    @Column(name = "tipo_movimentacao", nullable = false)
    private String tipoMovimentacao;

    @Column(name = "numero_locacoes", nullable = false)
    private Integer numeroLocacoes;


    public Estoque() {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Integer getEquipamentosId() {
        return equipamentosId;
    }

    public void setEquipamentosId(Integer equipamentosId) {
        this.equipamentosId = equipamentosId;
    }


    public LocalDateTime getEntrada() {
        return entrada;
    }

    public void setEntrada(LocalDateTime entrada) {
        this.entrada = entrada;
    }


    public LocalDateTime getSaida() {
        return saida;
    }

    public void setSaida(LocalDateTime saida) {
        this.saida = saida;
    }


    public Integer getFuncionarioId() {
        return funcionarioId;
    }

    public void setFuncionarioId(Integer funcionarioId) {
        this.funcionarioId = funcionarioId;
    }


    public String getTipoMovimentacao() {
        return tipoMovimentacao;
    }

    public void setTipoMovimentacao(String tipoMovimentacao) {
        this.tipoMovimentacao = tipoMovimentacao;
    }


    public Integer getNumeroLocacoes() {
        return numeroLocacoes;
    }

    public void setNumeroLocacoes(Integer numeroLocacoes) {
        this.numeroLocacoes = numeroLocacoes;
    }
}
