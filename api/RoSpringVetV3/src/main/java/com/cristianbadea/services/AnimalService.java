package com.cristianbadea.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.AnimalRepository;
import com.cristianbadea.repositories.StapanRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AnimalService {
    
    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private StapanRepository stapanRepository;
    @Autowired
    private PozeService      pozeService;

    public List<Animal> getAllAnimale(){
        return animalRepository.findAll(); 
    }

    public ResponseEntity<String> saveAnimal(String nume, String specie, String rasa, String imagine, long stapanId){
        Optional<Stapan> stapan = stapanRepository.findById(stapanId);
        if(stapan   == null)                        return new ResponseEntity<String>("Stapan de negăsit",                 HttpStatus.CONFLICT);
        if(nume     == null || nume.isBlank())      return new ResponseEntity<String>("Nume nu trebuie să fie gol",        HttpStatus.CONFLICT);
        if(specie   == null || specie.isBlank())    return new ResponseEntity<String>("Specia trebuie să fie specificată", HttpStatus.CONFLICT);
        Animal animal;
        try {
            animal = animalRepository.save(new Animal(nume, specie, rasa, stapan.get(), null, null, null, null));
            if(imagine != null){
                animal.setImagine(String.valueOf(animal.getAnimalId()));
                animalRepository.save(animal);
                pozeService.salveazaPoza("poze_animale", String.valueOf(animal.getAnimalId()), imagine, "animal");
            }
            ObjectMapper objectMapper = new ObjectMapper();
            String animalJson = objectMapper.writeValueAsString(animal);
            return ResponseEntity.ok(animalJson);
        } catch (Exception e) { 
            System.err.println(e);
            return new ResponseEntity<String>("Eroare la salvare animal", HttpStatus.CONFLICT); 
        }            
    }

    public ResponseEntity<String> editAnimal(long animalId, String nume, String specie, String rasa){
        Animal animal = animalRepository.findById(animalId).get();
        if(animal == null)   return new ResponseEntity<String>("Animal inexistent",                 HttpStatus.CONFLICT);
        if(nume.isEmpty())   return new ResponseEntity<String>("Nume nu trebuie să fie gol",        HttpStatus.CONFLICT);
        if(specie.isEmpty()) return new ResponseEntity<String>("Specia trebuie să fie specificată", HttpStatus.CONFLICT);
        animal.setNume(nume);
        animal.setSpecie(specie);
        animal.setRasa(rasa);
        animalRepository.save(animal);
        return ResponseEntity.ok("Editat cu succes");
    }
    
    public List<Animal> getAllAnimaleStapan(Stapan stapanId){
        return animalRepository.findAllByStapanId(stapanId);
    }
    
}
