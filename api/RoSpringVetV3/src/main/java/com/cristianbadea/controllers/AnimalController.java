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
import com.cristianbadea.dto.AnimalDTO;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.services.AnimalService;
import com.cristianbadea.services.AuthenticationService;
import com.cristianbadea.services.StapanService;

@RestController
@RequestMapping("/animale")
@CrossOrigin("*")
public class AnimalController {
    
    @Autowired
    private AnimalService animalService;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private StapanService stapanService;


    @GetMapping("/angajat/getAllAnimale")
    public List<Animal> getAllAnimale(){
        return animalService.getAllAnimale();
    }

    @PostMapping("/angajat/saveAnimal")
    public String saveAnimal(@RequestBody AnimalDTO animalDTO){
        return animalService.saveAnimal(
            animalDTO.getNume(), 
            animalDTO.getSpecie(), 
            animalDTO.getRasa(), 
            animalDTO.getImagine(), 
            animalDTO.getStapanId()
        );
    } 

    @PostMapping("/editAnimal")
    public ResponseEntity<String> editAnimal(@RequestBody AnimalDTO animalDTO){
        return animalService.editAnimal(
            animalDTO.getAnimalId(), 
            animalDTO.getNume(), 
            animalDTO.getSpecie(), 
            animalDTO.getRasa()
        );
    }

    //TODO: facut si pt angajat cand ia toate animalele stapanului
    @GetMapping("/stapan/getAllAnimaleStapan")
    public List<Animal> getAllAnimaleStapan(){
        String username = authenticationService.getUserConectat();
        Stapan stapanId = stapanService.findByEmail(username);
        return animalService.getAllAnimaleStapan(stapanId);
    }


}