package com.senaibackend.rental_eventos.services;

import com.senaibackend.rental_eventos.models.Funcionario;
import com.senaibackend.rental_eventos.repositories.FuncionarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;
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

    public Funcionario login(String nome, String senha, String setor) {

    Funcionario funcionario = funcionarioRepository
            .findByNome(nome)
            .orElseThrow(() ->
                    new RuntimeException(
                            "Funcionário não encontrado"
                    )
            );

    if (!funcionario.getSetor().equalsIgnoreCase(setor)) {

        throw new RuntimeException(
                "O funcionário não pertence a este setor."
        );
    }

    if (!passwordEncoder.matches(senha, funcionario.getSenha())) {

        throw new RuntimeException(
                "Senha incorreta"
        );
    }

    return funcionario;
}
}