package com.rob.userservice.service;

import com.rob.userservice.dto.UserRequest;
import com.rob.userservice.dto.UserResponse;
import com.rob.userservice.entity.Address;
import com.rob.userservice.entity.User;
import com.rob.userservice.entity.UserRole;
import com.rob.userservice.repository.AddressRepository;
import com.rob.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder encoder;
    private final AddressRepository addressRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByMailIgnoreCase(username).orElseThrow(() -> new UsernameNotFoundException("User with mail " + username + " not found"));

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
        return UserUtils.toDto(userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)));
    }

    public UserResponse updateUserById(Long id, UserRequest userRequest) {
        User userToSave = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
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

    public Long getUserIdByMail(String mail) {
        return userRepository.findByMailIgnoreCase(mail).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST)).getId();
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

    public Set<Address> getAddressesById(Long id) {
        return addressRepository.findByUserId(id);
    }
}
