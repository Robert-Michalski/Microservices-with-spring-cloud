package com.rob.apigateway;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class ManagerHeaderFilter extends AbstractGatewayFilterFactory<ManagerHeaderFilter.Config> {

    public ManagerHeaderFilter(){
        super(ManagerHeaderFilter.Config.class);
    }
    public static class Config {}
    @Value("${jwt_secret}")
    private String JWT_SECRET;
    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                return AuthUtils.onError(exchange, "No authorization header", HttpStatus.UNAUTHORIZED);
            }
            String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            String jwt = authorizationHeader.replace("Bearer", "");
            if(!isManagerOrAdmin(jwt)){
                AuthUtils.onError(exchange, "JWT is not valid", HttpStatus.UNAUTHORIZED);
            }
            return chain.filter(exchange);
        });
    }

    private boolean isManagerOrAdmin(String jwt){
        boolean returnValue = false;
        Object claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(jwt)
                .getBody()
                .get("roles");
        if(claims instanceof String role){
            if(role.equals("ROLE_ADMIN") || role.equals("ROLE_MANAGER")){
                returnValue=true;
            }
        }
        return returnValue;
    }
}
