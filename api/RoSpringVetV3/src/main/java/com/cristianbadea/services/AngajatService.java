package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Angajat;
import com.cristianbadea.repositories.AngajatRepository;

@Service
public class AngajatService {

    @Autowired
    private AngajatRepository angajatRepository;

    public List<Angajat> getAllAngajati() {
        return angajatRepository.findAll();
    }
    
    public String saveAngajat(String nume, String nrTelefon, String email, String imagine, String functie, String descriere){
        if(nume.isBlank())      return "Nume gol";
        if(nrTelefon.isBlank()) return "Nr Telefon gol";
        // TODO: de facut format mail nevalid
        if(email.isBlank())     return "Mail gol";
        if(functie.isBlank())   return "Functie goala";
        angajatRepository.save(new Angajat(nume, nrTelefon, email, imagine, functie, descriere));
        return "";
    }

    public Angajat findByEmail(String email){
        return angajatRepository.findByEmail(email);
    }

}