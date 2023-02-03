package com.rob.userservice.repository;

import com.rob.userservice.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Set<Address> findByUserId(long userId);

}
