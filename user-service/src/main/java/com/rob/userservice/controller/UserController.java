package com.rob.userservice.controller;

import com.rob.userservice.config.JWTGenerator;
import com.rob.userservice.dto.LoginRequest;
import com.rob.userservice.dto.LoginResponse;
import com.rob.userservice.dto.UserRequest;
import com.rob.userservice.dto.UserResponse;
import com.rob.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
@CrossOrigin("http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JWTGenerator jwtGenerator;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse saveUser(@RequestBody @Validated UserRequest userRequest){
        return userService.saveUser(userRequest);
    }

    @GetMapping("all")
    public List<UserResponse> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("{id}")
    public UserResponse getUserById(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @PutMapping("{id}")
    public UserResponse updateUserById(@PathVariable Long id, @RequestBody @Validated UserRequest userRequest){
        return userService.updateUserById(id, userRequest);
    }

    @DeleteMapping("{id}")
    public String deleteUserById(@PathVariable Long id){
        userService.deleteUserById(id);
        return "User id " + id + " successfully deleted";
    }

    @PostMapping("login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.mail(),
                        loginRequest.password()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        String username = jwtGenerator.getUsernameFromJWT(token);
        Long id = userService.getUserIdByMail(username);
        return new LoginResponse(id,token, username);
    }
}
