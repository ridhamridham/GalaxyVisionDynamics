package com.galaxyvision.galaxyvisiondynamics.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtRequestFilter jwtRequestFilter) throws Exception {
        http
            .cors(cors -> cors.disable())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/galaxyvision/users/register").permitAll()
                .requestMatchers(HttpMethod.POST, "/galaxyvision/users/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/galaxyvision/users/forgot-password").permitAll()
                .requestMatchers(HttpMethod.POST, "/galaxyvision/users/reset-password").permitAll()
                .requestMatchers(HttpMethod.POST, "/galaxyvision/admin/login").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}