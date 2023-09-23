package com.cristianbadea.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.dto.AnimalDTO;
import com.cristianbadea.models.Animal;
import com.cristianbadea.services.AnimalService;

@RestController
@RequestMapping("/animale")
@CrossOrigin("*")
public class AnimalController {
    
    @Autowired
    private AnimalService animalService;

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

    


    
}

