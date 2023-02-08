package com.rob.userservice.config;

import com.rob.userservice.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JWTGenerator {

    @Value("${jwt_expiration}")
    private long JWT_EXPIRATION;

    @Value("${jwt_secret}")
    private String JWT_SECRET;

    private final UserService userService;

    private static final Logger log = LoggerFactory.getLogger(JWTGenerator.class);

    public String generateToken(Authentication authentication) {

        String username = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = Date.from(Instant.now().plusSeconds(JWT_EXPIRATION));
        log.info("JWT_EXPIRATION = {}", JWT_EXPIRATION);
        log.info("Generating token for user {} valid untill {}", authentication.getName(), expireDate);
        Map<String, Object> claims = new HashMap<>();
        List<String> roles = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        roles.forEach(role -> claims.put("roles", role));

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .addClaims(claims)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public String getUsernameFromJWT(String token) {
        return Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
            return true;
        } catch (Exception ex) {
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect");
        }
    }
}
