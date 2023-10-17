package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.StapanRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class StapanService {
    
    @Autowired
    private StapanRepository      stapanRepository;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private PozeService           pozeService;

    public List<Stapan> getAllStapani(){
        return stapanRepository.findAll();
    }

    public ResponseEntity<String> saveStapan(String nume, String telefon, String email, String parola, String imagine){
        //salvare intai user cu authentication service si apoi stapanul
        try { authenticationService.registerUser(email, parola); } catch (Exception e) { return new ResponseEntity<String>("Userul exista deja", HttpStatus.CONFLICT);}
        try {                
            if(nume.isBlank())
                return new ResponseEntity<String>("Nume gol", HttpStatus.CONFLICT);
            if(telefon.isBlank())
                return new ResponseEntity<String>("Telefon gol", HttpStatus.CONFLICT);
            Stapan stapan = stapanRepository.save(new Stapan(nume, telefon, email, null, null, null, null));  
            if(imagine != null){
                //dupa ce se salveaza iau id-ul ca sa salvez si imaginea cu numele id-ului in BD (daca s-a selectat o imagine)
                stapan.setImagine(String.valueOf(stapan.getStapanId()));
                stapanRepository.save(stapan);
                //salvare imagine (base64String) in folder
                pozeService.salveazaPoza("poze_stapani", String.valueOf(stapan.getStapanId()), imagine, "stapan");
            }
            ObjectMapper objectMapper = new ObjectMapper();
            String stapanJson = objectMapper.writeValueAsString(stapan);
            return ResponseEntity.ok(stapanJson);
        } catch (Exception e) {
            System.out.println("Eroare salvare stapan " + e);
            return new ResponseEntity<String>("Eroare salvare stapan", HttpStatus.CONFLICT);
        }
    }

    public Stapan findByEmail(String email){
        return stapanRepository.findByEmail(email);
    }

}
