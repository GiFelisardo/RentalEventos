package com.senaibackend.rental_eventos.services;

import com.senaibackend.rental_eventos.models.Funcionario;
import com.senaibackend.rental_eventos.repositories.FuncionarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class FuncionarioService {

    private final FuncionarioRepository funcionarioRepository;
    private final PasswordEncoder passwordEncoder;

    public FuncionarioService(
            FuncionarioRepository funcionarioRepository,
            PasswordEncoder passwordEncoder) {

        this.funcionarioRepository = funcionarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Funcionario cadastrar(Funcionario funcionario) {

        // Verifica se já existe um funcionário com esse nome
        if (funcionarioRepository.existsByNome(funcionario.getNome())) {
            throw new RuntimeException("Nome já cadastrado");
        }

        // Criptografa a senha antes de salvar
        String senhaCriptografada =
                passwordEncoder.encode(funcionario.getSenha());

        funcionario.setSenha(senhaCriptografada);

        // Salva no banco
        return funcionarioRepository.save(funcionario);
    }

    public Funcionario login(String nome, String senha) {

    // Procura o funcionário pelo nome
    Funcionario funcionario = funcionarioRepository.findByNome(nome)
            .orElseThrow(() -> new RuntimeException("Funcionário não encontrado"));

    // Compara a senha digitada com a senha criptografada do banco
    if (!passwordEncoder.matches(senha, funcionario.getSenha())) {
        throw new RuntimeException("Senha incorreta");
    }

    return funcionario;
}
}