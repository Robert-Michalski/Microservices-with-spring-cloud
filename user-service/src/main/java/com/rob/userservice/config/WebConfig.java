package com.rob.userservice.config;

import com.rob.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebConfig {
    private final PasswordEncoder encoder;
    private final JwtAuthEntryPoint authEntryPoint;

    private final JWTGenerator generator;
    private final UserService userService;


    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration auth) throws Exception {
        return auth.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.httpBasic()
                .authenticationEntryPoint(authEntryPoint) // Handles auth error
                .and()
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .authorizeHttpRequests()
                .requestMatchers(HttpMethod.POST, "/api/user").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/user/login").permitAll()
                .requestMatchers("/api/user/*").authenticated()
                .requestMatchers(HttpMethod.GET,"/api/user/{id}/addresses").authenticated()
                .requestMatchers("/api/address").authenticated()
                .anyRequest().denyAll()
                .and()
                .httpBasic()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter() {
        return new JWTAuthenticationFilter(generator, userService);
    }


}
