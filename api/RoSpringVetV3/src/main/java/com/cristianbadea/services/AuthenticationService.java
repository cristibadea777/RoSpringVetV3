package com.cristianbadea.services;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cristianbadea.dto.LoginResponseDTO;
import com.cristianbadea.models.ApplicationUser;
import com.cristianbadea.models.Role;
import com.cristianbadea.repositories.RoleRepository;
import com.cristianbadea.repositories.UserRepository;

@Service
@Transactional 
//pt ca tranzactiile dintre aplicatie si baza de date sa fie manageriate de Spring
//fiecare metoda va fi tratata ca o tranzactie - daca avem mai multe calluri catre DB in metoda, si metoda da fail, BD nu se schimba
public class AuthenticationService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager; 
    @Autowired
    private TokenService tokenService; 


    public ApplicationUser registerUser(String username, String password){
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);
        return userRepository.save(new ApplicationUser(null, username, encodedPassword, authorities));
    }

    public LoginResponseDTO loginUser(String username, String password){
        //AuthenticationManager va verifica username, password prin UserService - daca sunt bune va genera un token de autentificare.
        //Tokenul de autentificare va fi trimis catre TokenService care genereaza JWT token
        //Cu tokenul JWT userul poate folosi API-ul fara sa mai trimita userul si parola de fiecare data cand acceseaza un endpoint
        //token-ul este stocat in header-ul de autorizatie 
        try {
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );

            String token = tokenService.generateJwt(auth);

            return new LoginResponseDTO(userRepository.findByUsername(username).get(), token);
            
        } catch (AuthenticationException e) { return new LoginResponseDTO(null, ""); }
    }

}
