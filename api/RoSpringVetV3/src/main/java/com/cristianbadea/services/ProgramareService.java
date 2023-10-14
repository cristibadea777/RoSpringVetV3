package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Programare;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.AnimalRepository;
import com.cristianbadea.repositories.ProgramareRepository;
import com.cristianbadea.repositories.StapanRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

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

    //TODO: programarile vechi sa se stearga cand se iau toate programarile (in serviciu sa se faca asta nu in controller)
    //TODO: verificat daca programarea contine data si ora - daca nu da return eroare

    public ResponseEntity<String> saveProgramare(String dataProgramare, String motiv, long stapanId, long animalId, String stare){
        try {
            Stapan stapan = stapabRepository.findById(stapanId).get();
            Animal animal = animalRepository.findById(animalId).get();
            Programare programare = programareRepository.save(new Programare(dataProgramare, motiv, stapan, animal, stare));            
            ObjectMapper objectMapper = new ObjectMapper();
            String programareJson = objectMapper.writeValueAsString(programare);
            return ResponseEntity.ok(programareJson);
        } catch (Exception e) {
            System.out.println("Eroare salvare programare " + e);
            return new ResponseEntity<String>("Eroare salvare programare", HttpStatus.CONFLICT);
        }
    }

}
