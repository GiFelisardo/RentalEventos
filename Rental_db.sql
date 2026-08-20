create database rental_db;

create table Funcionario(
	Id serial primary key,
	nome varchar(100) not null unique,
	setor varchar(50) not null,
	turno varchar(50) not null
);

create table Equipamentos(
	Id serial primary key,
	Marca varchar(100) not null,
	Modelo varchar(100) not null,
	Categoria varchar(100) not null,
	Potência varchar(100),
	Material varchar(100) not null,
	Peso varchar(100) not null,
	Dimensões varchar(100) not null,
	Cor varchar(100) not null,
	Quantidade_disponivel char(15),
	Quantidade_minima char(15)
);

create table Estoque(
	Id serial primary key,
	EquipamentosId int,
	constraint Equipamentos_id foreign key (EquipamentosId)
	references Equipamentos (Id),
	Entrada timestamp not null,
	Saida timestamp,
	FuncionarioId int,
	constraint Funcionario_id foreign key (FuncionarioId)
	references Funcionario (Id),
	Tipo_movimentacao varchar(100) not null,
	numero_locacoes char(15)
);
	
alter table funcionario add column Senha varchar(8) not null;	

