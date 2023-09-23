package com.cristianbadea.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.dto.AngajatDTO;
import com.cristianbadea.models.Angajat;
import com.cristianbadea.services.AngajatService;

@RestController
@RequestMapping("/angajati")
@CrossOrigin("*")
public class AngajatController {
    
    @Autowired
    private AngajatService angajatService;

    @GetMapping("/allAngajati")
    public List<Angajat> getAllAngajati(){
        return angajatService.getAllAngajati();
    }

    @PostMapping("/saveAngajat")
    public String saveAngajat(@RequestBody AngajatDTO angajatDTO){
        return angajatService.saveAngajat(
            angajatDTO.getNume(),
            angajatDTO.getNrTelefon(),
            angajatDTO.getEmail(),
            angajatDTO.getImagine(),
            angajatDTO.getFunctie(),
            angajatDTO.getDescriere()
        );
    }

    
}
