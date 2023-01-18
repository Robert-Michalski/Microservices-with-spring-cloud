package com.rob.userservice.service;

import com.rob.userservice.config.JWTGenerator;
import com.rob.userservice.dto.LoginRequest;
import com.rob.userservice.dto.LoginResponse;
import com.rob.userservice.dto.UserRequest;
import com.rob.userservice.dto.UserResponse;
import com.rob.userservice.entity.User;
import com.rob.userservice.entity.UserRole;
import com.rob.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByMailIgnoreCase(username);
        if(userOpt.isEmpty()){
            throw new UsernameNotFoundException("User with mail " + username + " not found");
        }
        User user = userOpt.get();
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getMail())
                .password(user.getPassword())
                .roles(user.getRole().toString())
                .build();
    }


    public UserResponse saveUser(UserRequest userRequest) {
        User userToSave = UserUtils.toEntity(userRequest);
        if (userRepository.findByMailIgnoreCase(userToSave.getMail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User with this mail already exists");
        }
        userToSave.setPassword(encoder.encode(userRequest.password()));
        userToSave.setRole(UserRole.USER);
        return UserUtils.toDto(userRepository.save(userToSave));
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserUtils::toDto)
                .toList();
    }

    public UserResponse getUserById(Long id) {
        checkIfExistsAndThrowRse(id, HttpStatus.BAD_REQUEST, UserUtils.badIdErrorMessage(id));
        return UserUtils.toDto(userRepository.findById(id).get());
    }

    public UserResponse updateUserById(Long id, UserRequest userRequest) {
        checkIfExistsAndThrowRse(id, HttpStatus.BAD_REQUEST, UserUtils.badIdErrorMessage(id));
        User userToSave = userRepository.findById(id).get();
        userToSave.setFirstName(userRequest.firstName());
        userToSave.setLastName(userRequest.lastName());
        userToSave.setMail(userRequest.mail());
        userToSave.setPhone(userRequest.phone());
        userToSave.setPassword(encoder.encode(userRequest.password()));
        return UserUtils.toDto(userRepository.save(userToSave));
    }

    public void deleteUserById(Long id) {
        checkIfExistsAndThrowRse(id, HttpStatus.BAD_REQUEST, UserUtils.badIdErrorMessage(id));
        userRepository.deleteById(id);
    }

    public Long getUserIdByMail(String mail){
        if(userRepository.findByMailIgnoreCase(mail).get()!=null)
        return userRepository.findByMailIgnoreCase(mail).get().getId();
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "NO USER WITH MAIL " + mail);
    }

    private boolean checkIfExistsAndThrowRse(Long id, HttpStatus httpStatus, String message) {
        if (userRepository.findById(id).isEmpty()) {
            throw new ResponseStatusException(httpStatus, message);
        }
        return false;
    }


    public Long countAll() {
        return userRepository.count();
    }
}
