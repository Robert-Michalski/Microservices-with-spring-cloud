package com.rob.userservice.controller;

import com.rob.userservice.dto.UserRequest;
import com.rob.userservice.dto.UserResponse;
import com.rob.userservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    @PostMapping
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
}
