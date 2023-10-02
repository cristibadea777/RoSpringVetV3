package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Angajat;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Diagnostic;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.models.Tratament;
import com.cristianbadea.models.Vizita;
import com.cristianbadea.repositories.AngajatRepository;
import com.cristianbadea.repositories.AnimalRepository;
import com.cristianbadea.repositories.DiagnosticRepository;
import com.cristianbadea.repositories.StapanRepository;
import com.cristianbadea.repositories.TratamentRepository;
import com.cristianbadea.repositories.VizitaRepository;

@Service
public class VizitaService {
    
    @Autowired
    private VizitaRepository      vizitaRepository;
    @Autowired
    private DiagnosticRepository  diagnosticRepository;
    @Autowired
    private TratamentRepository   tratamentRepository;
    @Autowired
    private AnimalRepository      animalRepository;
    @Autowired
    private StapanRepository      stapanRepository;
    @Autowired
    private AngajatRepository     angajatRepository;


    public List<Vizita> getAllVizite(){
        return vizitaRepository.findAll();
    }

    public String saveVizita(String dataVizita, long animalId, long stapanId, long angajatId, String motiv, String diagnostic_string, String metodaTratament, String dataInceput, String dataSfarsit) {
        if(diagnostic_string.isBlank()) return "Diagnostic este gol";         
        if(metodaTratament.isBlank())   return "Metoda tratament este goala";        
        try {
            Animal  animal   = animalRepository.findById(animalId).get();
            Stapan  stapan   = stapanRepository.findById(stapanId).get();
            Angajat angajat  = angajatRepository.findById(angajatId).get();
            Diagnostic diagnostic = new Diagnostic();
            diagnostic.setDiagnostic(diagnostic_string);
            diagnosticRepository.save(diagnostic);
            Tratament tratament = new Tratament(metodaTratament, dataInceput, dataSfarsit, diagnostic, animal);
            tratamentRepository.save(tratament);
            diagnostic.setTratamentId(tratament);
            diagnosticRepository.save(diagnostic);
            Vizita vizita = new Vizita(dataVizita, animal, stapan, angajat, stapan.getNume(), animal.getNume(), angajat.getNume(), motiv, diagnostic, tratament);
            vizitaRepository.save(vizita);
            tratament.setVizitaId(vizita);
            tratamentRepository.save(tratament);
        } catch (Exception e) {
            System.out.println("Eroare salvare vizita: " + e);
            return "Eroare";
        }
        return "";
    }

    public List<Vizita> getAllViziteStapan(Stapan stapanId){
        return vizitaRepository.findAllByStapanId(stapanId);
    }

}
