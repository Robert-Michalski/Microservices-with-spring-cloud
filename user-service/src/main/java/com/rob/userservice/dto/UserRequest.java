package com.rob.userservice.dto;

import jakarta.validation.constraints.*;

public record UserRequest(
        @NotEmpty(message = "First name cannot be empty")
        @Pattern(message = "First name must contain only letters",
                regexp = "[a-zA-Z]+")
        String firstName,

        @NotEmpty(message = "Last name cannot be empty")
        @Pattern(message = "Last name must contain only letters",
                regexp = "[a-zA-Z]+")
        String lastName,

        @NotEmpty(message = "Phone cannot be empty")
        @Digits(message = "Phone must consist of numbers only", integer = 9, fraction = 0)
        String phone,
        @NotEmpty(message = "Mail cannot be empty") @Email String mail,
        @NotEmpty(message = "Password cannot be empty")
                @Size(min = 8, message = "Password must be longer than 8 characters")
                @Pattern(regexp = "^(?=\\P{Ll}*\\p{Ll})(?=\\P{Lu}*\\p{Lu})(?=\\P{N}*\\p{N})(?=[\\p{L}\\p{N}]*[^\\p{L}\\p{N}])[\\s\\S]{8,}$",
                        message = "Password must contain at least : 1 digit, 1 lower case, 1 upper case, 1 special character")
        String password) {
}
