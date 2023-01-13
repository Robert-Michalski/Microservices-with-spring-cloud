package com.rob.userservice.service;

import com.rob.userservice.dto.UserRequest;
import com.rob.userservice.dto.UserResponse;
import com.rob.userservice.entity.User;

public class UserUtils {

    public static UserResponse toDto(User user){
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .mail(user.getMail())
                .role(user.getRole())
                .build();
    }

    public static User toEntity(UserRequest userRequest){
        return User.builder()
                .firstName(userRequest.firstName())
                .lastName(userRequest.lastName())
                .phone(userRequest.phone())
                .mail(userRequest.mail())
                .password(userRequest.password())
                .build();
    }
}
