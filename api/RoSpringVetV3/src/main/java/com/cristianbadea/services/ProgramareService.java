package com.cristianbadea.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
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

    public static boolean isValidDateTime(String dateTimeString) {
        String format = "yyyy-MM-dd HH:mm"; // Define the expected date-time format
        
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
            LocalDateTime.parse(dateTimeString, formatter);
            return true; // Parsing was successful, the string represents a valid date and time
        } catch (DateTimeParseException e) {
            return false; // Parsing failed, the string is not in the expected format
        }
    }

    public boolean esteFormatValid(String stringData){
        String format = "yyyy-MM-dd HH:mm";
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
            LocalDateTime.parse(stringData, formatter);
            return true;
        } catch(DateTimeParseException ex){ return false; }
    }

    //TODO: programarile vechi sa se stearga cand se iau toate programarile (in serviciu sa se faca asta nu in controller)

    public ResponseEntity<String> saveProgramare(String dataProgramare, String motiv, long stapanId, long animalId, String stare){
        if(dataProgramare == null || dataProgramare.isBlank()) 
            return new ResponseEntity<String>("Completează data", HttpStatus.CONFLICT);
        if(!esteFormatValid(dataProgramare))
            return new ResponseEntity<String>("Dată invalidă", HttpStatus.CONFLICT);
        try {
            Stapan stapan = stapabRepository.findById(stapanId).get();
            Animal animal = animalRepository.findById(animalId).get();
            Programare programare = programareRepository.save(new Programare(dataProgramare, motiv, stapan, animal, stare));            
            ObjectMapper objectMapper = new ObjectMapper();
            String programareJson = objectMapper.writeValueAsString(programare);
            return ResponseEntity.ok(programareJson);
        } catch (Exception e) {
            return new ResponseEntity<String>("Eroare salvare programare", HttpStatus.CONFLICT);
        }
    }

}
