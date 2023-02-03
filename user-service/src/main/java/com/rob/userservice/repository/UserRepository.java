package com.rob.userservice.repository;

import com.rob.userservice.entity.Address;
import com.rob.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMailIgnoreCase(String mail);

}
