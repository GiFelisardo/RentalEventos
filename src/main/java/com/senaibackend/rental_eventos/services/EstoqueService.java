package com.senaibackend.rental_eventos.services;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.senaibackend.rental_eventos.models.Equipamento;
import com.senaibackend.rental_eventos.models.Estoque;
import com.senaibackend.rental_eventos.repositories.EquipamentoRepository;
import com.senaibackend.rental_eventos.repositories.EstoqueRepository;

@Service
public class EstoqueService {

    private final EstoqueRepository estoqueRepository;
    private final EquipamentoRepository equipamentoRepository;

    public EstoqueService(
            EstoqueRepository estoqueRepository,
            EquipamentoRepository equipamentoRepository) {

        this.estoqueRepository = estoqueRepository;
        this.equipamentoRepository = equipamentoRepository;
    }

    @Transactional
    public Estoque registrarMovimentacao(Estoque estoque) {

        // Verifica se a quantidade foi informada corretamente
        if (estoque.getNumeroLocacoes() == null ||
                estoque.getNumeroLocacoes() <= 0) {

            throw new RuntimeException(
                    "A quantidade de itens deve ser maior que zero."
            );
        }

        // Verifica o tipo de movimentação
        if (estoque.getTipoMovimentacao() == null ||
                (!estoque.getTipoMovimentacao().equals("ENTRADA")
                && !estoque.getTipoMovimentacao().equals("SAIDA"))) {

            throw new RuntimeException(
                    "Tipo de movimentação inválido."
            );
        }

        // Busca o equipamento pelo ID
        Equipamento equipamento = equipamentoRepository
                .findById(estoque.getEquipamentosId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Equipamento não encontrado."
                        )
                );

        int quantidade = estoque.getNumeroLocacoes();
        int quantidadeAtual = equipamento.getQuantidadeDisponivel();

        // =========================
        // ENTRADA
        // =========================

        if (estoque.getTipoMovimentacao().equals("ENTRADA")) {

            equipamento.setQuantidadeDisponivel(
                    quantidadeAtual + quantidade
            );

            estoque.setEntrada(LocalDateTime.now());
            estoque.setSaida(null);
        }

        // =========================
        // SAÍDA
        // =========================

        else {

            // Não permite retirar mais do que existe
            if (quantidade > quantidadeAtual) {

                throw new RuntimeException(
                        "Quantidade insuficiente em estoque. "
                        + "Disponível: " + quantidadeAtual
                );
            }

            equipamento.setQuantidadeDisponivel(
                    quantidadeAtual - quantidade
            );

            estoque.setSaida(LocalDateTime.now());
            estoque.setEntrada(null);
        }

        // Salva a alteração do equipamento
        equipamentoRepository.save(equipamento);

        // Salva a movimentação
        return estoqueRepository.save(estoque);
    }
}
