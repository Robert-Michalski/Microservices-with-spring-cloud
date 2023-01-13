package com.rob.userservice.dto;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record UserRequest(
        @NotEmpty(message = "First name cannot be empty") String firstName,
        @NotEmpty(message = "Last name cannot be empty") String lastName,
        @NotEmpty(message = "Phone cannot be empty") String phone,
        @NotEmpty(message = "Mail cannot be empty") @Email String mail,
        @NotEmpty(message = "Password cannot be empty") String password) {}
