package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Angajat;
import com.cristianbadea.models.ApplicationUser;
import com.cristianbadea.repositories.AngajatRepository;
import com.cristianbadea.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AngajatService {

    @Autowired
    private AngajatRepository     angajatRepository;
    @Autowired
    private UserRepository        userRepository;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private PozeService           pozeService;

    public List<Angajat> getAllAngajati() {
        return angajatRepository.findAll();
    }
    
    public ResponseEntity<String> saveAngajat(String nume, String nrTelefon, String email, String imagine, String functie, String descriere, String parola){
        if(email     == null  || email.isBlank())      return new ResponseEntity<String>("Email gol",     HttpStatus.CONFLICT);
        if(nume      == null  || nume.isBlank())       return new ResponseEntity<String>("Nume gol",      HttpStatus.CONFLICT);
        if(nrTelefon == null  || nrTelefon.isBlank())  return new ResponseEntity<String>("Telefon gol",   HttpStatus.CONFLICT);
        if(functie   == null  || functie.isBlank())    return new ResponseEntity<String>("Funcție goală", HttpStatus.CONFLICT);
        if(parola    == null  || parola.isBlank())     return new ResponseEntity<String>("Parolă goală",  HttpStatus.CONFLICT);
        
        Angajat angajat;
        try { 
            authenticationService.registerUser(email, parola); 
            angajat = angajatRepository.save(new Angajat(nume, nrTelefon, email, null, functie, null));
        } catch (Exception e) { return new ResponseEntity<String>("Userul exista deja", HttpStatus.CONFLICT); }

        try {                        
            if(imagine != null){
                angajat.setImagine(String.valueOf(angajat.getAngajatId()));
                angajatRepository.save(angajat);
                pozeService.salveazaPoza("poze_angajati", String.valueOf(angajat.getAngajatId()), imagine, "angajat");
            }
            ObjectMapper objectMapper = new ObjectMapper();
            String angajatJson = objectMapper.writeValueAsString(angajat);
            return ResponseEntity.ok(angajatJson);
        } catch (Exception e) { return new ResponseEntity<String>("Eroare salvare angajat", HttpStatus.CONFLICT); }
        
    }

    public ResponseEntity<String> editAngajat(long angajatId, String nume, String nrTelefon, String email, String functie){
        if(email     == null  || email.isBlank())      return new ResponseEntity<String>("Email gol",     HttpStatus.CONFLICT);
        if(nume      == null  || nume.isBlank())       return new ResponseEntity<String>("Nume gol",      HttpStatus.CONFLICT);
        if(nrTelefon == null  || nrTelefon.isBlank())  return new ResponseEntity<String>("Telefon gol",   HttpStatus.CONFLICT);
        if(functie   == null  || functie.isBlank())    return new ResponseEntity<String>("Funcție goală", HttpStatus.CONFLICT);
        Angajat         angajat = null;
        ApplicationUser user    = null;

        try {
            angajat = angajatRepository.findById(angajatId).get();
            user    = userRepository.findByUsername(angajat.getEmail()).get();
        } catch (Exception e) {
            return new ResponseEntity<String>("User inexistent", HttpStatus.CONFLICT);
        }
        if(user == null || angajat == null)  return new ResponseEntity<String>("User inexistent", HttpStatus.CONFLICT);

        try {
            if(user.getUsername() != email){
                userRepository.updateEmail(user.getUsername(), email);
                angajatRepository.update(angajatId, nume, nrTelefon, email, functie);
            }
            return ResponseEntity.ok("Editat cu succes");
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<String>("Eroare - email deja existent",   HttpStatus.CONFLICT);
        }

    }

    public Angajat findByEmail(String email){
        return angajatRepository.findByEmail(email);
    }

}