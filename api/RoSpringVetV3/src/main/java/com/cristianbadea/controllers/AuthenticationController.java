package com.cristianbadea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.dto.LoginDTO;
import com.cristianbadea.dto.LoginResponseDTO;
import com.cristianbadea.dto.RegistrationDTO;
import com.cristianbadea.services.AuthenticationService;
import com.cristianbadea.services.StapanService;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private StapanService         stapanService;

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody RegistrationDTO body){
        if(! isValidEmail(body.getUsername()))
            return "Format mail nevalid";
        if(body.getUsername() != null && ! body.getUsername().isEmpty() && stapanService.findByEmail(body.getUsername()) != null)
            return "Email existent";
        if(body.getNume() != null && body.getNume().isBlank())
            return "Nume este gol";
        if(body.getPassword() != null && body.getPassword().isBlank())
            return "Parola este goala";
        //TODO: REFACUT INREGISTRAREA
        //authenticationService.registerUser(body.getUsername(), body.getPassword());
        stapanService.saveStapan(body.getNume(), body.getTelefon(), body.getUsername(), body.getPassword(), null);
        return "Registered succesfully";
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginDTO body){
        return authenticationService.loginUser(body.getUsername(), body.getPassword()); 
    }

    @GetMapping("/logout")
    public void logout(){
        //client-side se sterge si tokenul
        SecurityContextHolder.clearContext();
    }

}