package com.rob.userservice.service;

import com.rob.userservice.dto.UserRequest;
import com.rob.userservice.dto.UserResponse;
import com.rob.userservice.entity.User;
import com.rob.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }


    public UserResponse saveUser(UserRequest userRequest){
        User userToSave = UserUtils.toEntity(userRequest);
        if(userRepository.findByMailIgnoreCase(userToSave.getMail()).isPresent()){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this mail already exists");
        }
        return UserUtils.toDto(userRepository.save(userToSave));
    }

    public List<UserResponse> getAllUsers(){
        return userRepository.findAll()
                .stream()
                .map(UserUtils::toDto)
                .toList();
    }

    public UserResponse getUserById(Long id){
        checkIfExistsAndThrowRse(id, HttpStatus.BAD_REQUEST,"User with id " + id + " not found" );
        return UserUtils.toDto(userRepository.findById(id).get());
    }

    public UserResponse updateUserById(Long id, UserRequest userRequest){
        checkIfExistsAndThrowRse(id, HttpStatus.BAD_REQUEST,"User with id " + id + " not found" );
        User userToSave = UserUtils.toEntity(userRequest);
        return UserUtils.toDto(userRepository.save(userToSave));
    }

    public void deleteUserById(Long id){
        checkIfExistsAndThrowRse(id, HttpStatus.BAD_REQUEST,"User with id " + id + " not found" );
        userRepository.deleteById(id);
    }

    private boolean checkIfExistsAndThrowRse(Long id, HttpStatus httpStatus, String message){
        if(userRepository.findById(id).isEmpty()){
            throw new ResponseStatusException(httpStatus, message);
        }
        return false;
    }
}
