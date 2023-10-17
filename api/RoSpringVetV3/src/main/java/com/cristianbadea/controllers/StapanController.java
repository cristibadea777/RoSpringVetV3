package com.cristianbadea.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cristianbadea.dto.StapanDTO;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.services.AuthenticationService;
import com.cristianbadea.services.StapanService;

@RestController
@RequestMapping("/stapani")
@CrossOrigin("*")
public class StapanController {
    
    @Autowired
    private StapanService stapanService;

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/angajat/getAllStapani")
    public List<Stapan> getAllStapani(){
        return stapanService.getAllStapani();
    }   

    @GetMapping("/stapan/getStapanConectat")
    public Stapan getStapanConectat(){
        String username = authenticationService.getUserConectat();
        return stapanService.findByEmail(username);
    }

    @PostMapping("/angajat/saveStapan")
    public ResponseEntity<String> saveStapan(@RequestBody StapanDTO stapanDTO){  
        return stapanService.saveStapan(stapanDTO.getNume(), stapanDTO.getNrTelefon(), stapanDTO.getEmail(), stapanDTO.getParola(), stapanDTO.getImagine());
    }

}