package com.cristianbadea.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
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
    private StapanRepository stapanRepository;
    @Autowired
    private AnimalRepository animalRepository;

    private LocalDateTime currentDateTime = LocalDateTime.now();
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public void deleteProgramariVechi(){
        List<Programare> programari = programareRepository.findAll();
        List<Programare> programariDeSters = new ArrayList<Programare>();
        for (Programare programare : programari) {
            LocalDateTime dateTimeProgramare = LocalDateTime.parse(programare.getDataProgramare(), formatter);
            if (dateTimeProgramare.isBefore(currentDateTime)) {
                programariDeSters.add(programare);
            }
        }
        programareRepository.deleteAll(programariDeSters);
    }

    public List<Programare> getAllProgramari(){
        deleteProgramariVechi();
        List<Programare> programari = programareRepository.findAll();
        return programari;
    }

    
    public List<Programare> getAllProgramariStapan(Stapan stapanId) {
        return programareRepository.findAllByStapanId(stapanId);
    }

    public boolean esteFormatValid(String stringData){
        String format = "yyyy-MM-dd HH:mm";
        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
            LocalDateTime.parse(stringData, formatter);
            return true;
        } catch(DateTimeParseException ex){ return false; }
    }

    public ResponseEntity<String> verificaProgramare(String dataProgramare){
        if(dataProgramare == null || dataProgramare.isBlank()) 
            return new ResponseEntity<String>("Completează data", HttpStatus.CONFLICT);
        if(!esteFormatValid(dataProgramare))
            return new ResponseEntity<String>("Dată invalidă", HttpStatus.CONFLICT);
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");  
        LocalDateTime now = LocalDateTime.now();  
        LocalDateTime data = LocalDateTime.parse(dataProgramare, dtf);
        if(data.isBefore(now))
            return new ResponseEntity<String>("Selectează o dată din viitor", HttpStatus.CONFLICT);
        return null;
    }

    public ResponseEntity<String> saveProgramare(String dataProgramare, String motiv, long stapanId, long animalId, String stare){
        ResponseEntity<String> verificare = verificaProgramare(dataProgramare);
        if( verificare != null) return verificare;
        try {
            Stapan stapan = stapanRepository.findById(stapanId).get();
            Animal animal = animalRepository.findById(animalId).get();
            Programare programare = programareRepository.save(new Programare(dataProgramare, motiv, stapan, animal, stare));            
            ObjectMapper objectMapper = new ObjectMapper();
            String programareJson = objectMapper.writeValueAsString(programare);
            return ResponseEntity.ok(programareJson);
        } catch (Exception e) {
            return new ResponseEntity<String>("Eroare salvare programare", HttpStatus.CONFLICT);
        }
    }

    public ResponseEntity<String> editProgramare(long programareId, String dataProgramare, String motiv, long stapanId, long animalId, String stare) {
        ResponseEntity<String> verificare = verificaProgramare(dataProgramare);
        if( verificare != null) return verificare;
        try {
            Stapan stapan = stapanRepository.findById(stapanId).get();
            Animal animal = animalRepository.findById(animalId).get();
            Programare programare = programareRepository.findById(programareId).get();
            programare.setAnimalId(animal);
            programare.setStapanId(stapan);
            programare.setMotiv(motiv);
            programare.setStare(stare);
            programare.setDataProgramare(dataProgramare);
            programareRepository.save(programare);      
            ObjectMapper objectMapper = new ObjectMapper();
            String programareJson = objectMapper.writeValueAsString(programare);
            return ResponseEntity.ok(programareJson);
        } catch (Exception e) {
            return new ResponseEntity<String>("Eroare editare programare", HttpStatus.CONFLICT);
        }
    }

    public ResponseEntity<String> deleteProgramare(long programareId) {
        try {
            Programare programare = programareRepository.findById(programareId).get();
            programareRepository.delete(programare);
            return ResponseEntity.ok("Programare stearsa");
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<String>("Eroare stergere programare", HttpStatus.CONFLICT);
        }
    }

}