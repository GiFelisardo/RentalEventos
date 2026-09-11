package com.senaibackend.rental_eventos.config;


import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(
info = @Info(
title = "Rental Eventos",
version = "1.0",
description = "Locações de equipamentos"
)
)

public class Swagger {
    
}