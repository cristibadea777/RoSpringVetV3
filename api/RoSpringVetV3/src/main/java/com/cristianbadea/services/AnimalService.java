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

@Service
public class AnimalService {
    
    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private StapanRepository stapanRepository;

    public List<Animal> getAllAnimale(){
        return animalRepository.findAll(); 
    }

    public String saveAnimal(String nume, String specie, String rasa, String imagine, long stapanId){
        Optional<Stapan> stapan = stapanRepository.findById(stapanId);
        if(stapan == null)
            return "Eroare - stapan null";
        if(nume.isEmpty() || specie.isEmpty())
            return "NUME SI SPECIE NU TREBUIE SA FIE GOALE";
        animalRepository.save(new Animal(nume, specie, rasa, stapan.get(), null, null, null, imagine));
        return "";
    }

    public ResponseEntity<String> editAnimal(long animalId, String nume, String specie, String rasa){
        Animal animal = animalRepository.findById(animalId).get();
        if(animal == null)
            return new ResponseEntity<String>("Animal inexistent", HttpStatus.CONFLICT);
        if(nume.isEmpty())
            return new ResponseEntity<String>("Nume nu trebuie să fie gol", HttpStatus.CONFLICT);
        if(specie.isEmpty())
            return new ResponseEntity<String>("Specia trebuie să fie specificată", HttpStatus.CONFLICT);
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
