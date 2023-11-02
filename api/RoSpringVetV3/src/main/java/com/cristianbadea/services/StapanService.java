package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cristianbadea.models.ApplicationUser;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.StapanRepository;
import com.cristianbadea.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class StapanService {
    
    @Autowired
    private StapanRepository      stapanRepository;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private PozeService           pozeService;
    @Autowired
    private UserRepository        userRepository;

    public List<Stapan> getAllStapani(){
        return stapanRepository.findAll();
    }

    public Stapan getStapan(long stapanId){
        return stapanRepository.findById(stapanId).get();
    }

    public ResponseEntity<String> saveStapan(String nume, String nrTelefon, String email, String parola, String imagine){
        
        if(email     == null  || email.isBlank())      return new ResponseEntity<String>("Email gol",     HttpStatus.CONFLICT);
        if(parola    == null  || parola.isBlank())     return new ResponseEntity<String>("Parola goală",  HttpStatus.CONFLICT);
        if(nume      == null  || nume.isBlank())       return new ResponseEntity<String>("Nume gol",      HttpStatus.CONFLICT);
        if(nrTelefon == null  || nrTelefon.isBlank())  return new ResponseEntity<String>("Telefon gol",   HttpStatus.CONFLICT);

        Stapan stapan;
        try { 
             //salvare intai user cu authentication service si apoi stapanul   
            authenticationService.registerUser(email, parola); 
            stapan = stapanRepository.save(new Stapan(nume, nrTelefon, email, null, null, null, null));
        } catch (Exception e) { return new ResponseEntity<String>("Userul exista deja", HttpStatus.CONFLICT); }

        try {                        
            //dupa ce se salveaza iau id-ul ca sa salvez si imaginea cu numele id-ului in BD (daca s-a selectat o imagine)
            if(imagine != null){
                stapan.setImagine(String.valueOf(stapan.getStapanId()));
                stapanRepository.save(stapan);
                //salvare imagine (base64String) in folder
                pozeService.salveazaPoza("poze_stapani", String.valueOf(stapan.getStapanId()), imagine, "stapan");
            }

            //trimitere obiect JSON catre frontend
            ObjectMapper objectMapper = new ObjectMapper();
            String stapanJson = objectMapper.writeValueAsString(stapan);
            return ResponseEntity.ok(stapanJson);
        } catch (Exception e) { return new ResponseEntity<String>("Eroare salvare stapan", HttpStatus.CONFLICT); }
    }

    public Stapan findByEmail(String email){
        return stapanRepository.findByEmail(email);
    }

    public ResponseEntity<String> editStapan(long stapanId, String nume, String nrTelefon, String email) {
        if(email     == null  || email.isBlank())      return new ResponseEntity<String>("Email gol",     HttpStatus.CONFLICT);
        if(nume      == null  || nume.isBlank())       return new ResponseEntity<String>("Nume gol",      HttpStatus.CONFLICT);
        if(nrTelefon == null  || nrTelefon.isBlank())  return new ResponseEntity<String>("Telefon gol",   HttpStatus.CONFLICT);

        Stapan          stapan = null;
        ApplicationUser user   = null;
        try {
            stapan = stapanRepository.findById(stapanId).get();
            user   = userRepository.findByUsername(stapan.getEmail()).get();
        } catch (Exception e) {
            return new ResponseEntity<String>("User inexistent", HttpStatus.CONFLICT);
        }
        if(user == null || stapan == null)  return new ResponseEntity<String>("User inexistent", HttpStatus.CONFLICT);

        try {
            if(user.getUsername() != email){
                userRepository.updateEmail(user.getUsername(), email);
                stapanRepository.update(stapanId, nume, nrTelefon, email);
            }
            return ResponseEntity.ok("Editat cu succes");
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<String>("Eroare - email deja existent",   HttpStatus.CONFLICT);
        }
    }
}