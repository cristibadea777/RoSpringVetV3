package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Programare;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.AnimalRepository;
import com.cristianbadea.repositories.ProgramareRepository;
import com.cristianbadea.repositories.StapanRepository;

@Service
public class ProgramareService {
    
    @Autowired
    private ProgramareRepository programareRepository;
    @Autowired
    private StapanRepository stapabRepository;
    @Autowired
    private AnimalRepository animalRepository;


    public List<Programare> getAllProgramari(){
        return programareRepository.findAll();
    }

    public List<Programare> getAllProgramariStapan(Stapan stapanId) {
        return programareRepository.findAllByStapanId(stapanId);
    }

    public String saveProgramare(String dataProgramare, String motiv, long stapanId, long animalId, String stare){
        try {
            Stapan stapan = stapabRepository.findById(stapanId).get();
            Animal animal = animalRepository.findById(animalId).get();
            Programare programare = new Programare(dataProgramare, motiv, stapan, animal, stare);
            programareRepository.save(programare);
        } catch (Exception e) {
            System.out.println("Eroare salvare programare " + e);
            return "Eroare";
        }
        return "";
    }

}
