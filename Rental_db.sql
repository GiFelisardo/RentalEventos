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
	Potencia varchar(100),
	Material varchar(100) not null,
	Peso varchar(100) not null,
	Dimensoes varchar(100) not null,
	Cor varchar(100) not null,
	Quantidade_disponivel integer,
	Quantidade_minima integer
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
	numero_locacoes integer
);
	
alter table funcionario add column Senha varchar(8) not null;	

