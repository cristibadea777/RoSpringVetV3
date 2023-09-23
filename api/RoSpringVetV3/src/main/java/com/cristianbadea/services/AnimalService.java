package com.cristianbadea.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
            return "STAPAN NU EXISTA";
        if(nume.isEmpty() || specie.isEmpty())
            return "NUME SI SPECIE NU TREBUIE SA FIE GOALE";
        animalRepository.save(new Animal(nume, specie, rasa, stapan.get(), null, null, null, imagine));
        return "";
    }
    
    

}
