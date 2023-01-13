package com.rob.userservice.dto;

import com.rob.userservice.entity.UserRole;
import lombok.Builder;

@Builder
public record UserResponse(Long id, String firstName, String lastName, String phone, String mail, UserRole role) {
}
