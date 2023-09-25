package com.cristianbadea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @PostMapping("/register")
    public String registerUser(@RequestBody RegistrationDTO body){
        //TODO: verificat format email valid
        if(body.getUsername() != null && stapanService.findByEmail(body.getUsername()) != null)
            return "Email existent";
        if(body.getNume() != null && body.getNume().isBlank())
            return "Nume este gol";
        if(body.getPassword() != null && body.getPassword().isBlank())
            return "Parola este goala";
        authenticationService.registerUser(body.getUsername(), body.getPassword());
        stapanService.saveStapan(body.getNume(), body.getTelefon(), body.getUsername());
        return "";
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginDTO body){
        return authenticationService.loginUser(body.getUsername(), body.getPassword()); 
    }

}
