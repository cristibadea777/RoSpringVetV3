package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.fasterxml.jackson.databind.ObjectMapper;

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
        //TODO: filtrare dupa data vizita (descrescator)
        return vizitaRepository.findAll();
    }

    public String verificaContinutVizita(String diagnostic_string, String metodaTratament, String dataInceput, String dataSfarsit){
        if(diagnostic_string == null || diagnostic_string.isBlank()) return "Diagnostic este gol";            
        if(metodaTratament   == null || metodaTratament.isBlank())   return "Metoda tratament este goala";        
        if(dataInceput       == null || dataInceput.isBlank())       return "Data inceput este goala";
        if(dataSfarsit       == null || dataSfarsit.isBlank())       return "Data sfarsit este goala";
        return null;
    }

    public ResponseEntity<String> saveVizita(String dataVizita, long animalId, long stapanId, long angajatId, String motiv, String diagnostic_string, String metodaTratament, String dataInceput, String dataSfarsit) {
        
        String verificare = verificaContinutVizita(diagnostic_string, metodaTratament, dataInceput, dataSfarsit);
        if(verificare != null) return new ResponseEntity<String>(verificare, HttpStatus.CONFLICT);

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
            Vizita vizita = vizitaRepository.save(new Vizita(dataVizita, animal, stapan, angajat, stapan.getNume(), animal.getNume(), angajat.getNume(), motiv, diagnostic, tratament));
            tratament.setVizitaId(vizita);
            tratamentRepository.save(tratament);
            ObjectMapper objectMapper = new ObjectMapper();
            String vizitaJson = objectMapper.writeValueAsString(vizita);
            return ResponseEntity.ok(vizitaJson); 
        } catch (Exception e) {
            return new ResponseEntity<String>("Eroare salvare vizita", HttpStatus.CONFLICT);
        }
    }

    public List<Vizita> getAllViziteStapan(Stapan stapanId){
        return vizitaRepository.findAllByStapanId(stapanId);
    }

    public ResponseEntity<String> editVizita(long vizitaId, String dataVizita, long angajatId, String motiv, String diagnostic_string, String metodaTratament, String dataInceput, String dataSfarsit) {
        
        String verificare = verificaContinutVizita(diagnostic_string, metodaTratament, dataInceput, dataSfarsit);
        if(verificare != null) return new ResponseEntity<String>(verificare, HttpStatus.CONFLICT);
        Vizita vizita = vizitaRepository.findById(vizitaId).get();
        vizita.setMotiv(motiv);
        try {
            Angajat   angajat     = angajatRepository.findById(angajatId).get();
            Tratament tratament   = tratamentRepository.findById(vizita.getTratament().getTratamentId()).get();
            Diagnostic diagnostic = diagnosticRepository.findById(vizita.getDiagnostic().getDiagnosticId()).get();
            vizita.setAngajatId(angajat);
            diagnostic.setDiagnostic(diagnostic_string);
            diagnosticRepository.save(diagnostic);
            tratament.setDataInceput(dataInceput);
            tratament.setDataSfarsit(dataSfarsit);
            tratament.setMetodaTratament(metodaTratament);
            tratamentRepository.save(tratament);
            vizita.setTratamentId(tratament);
            vizita.setDiagnosticId(diagnostic);
            vizitaRepository.save(vizita);
            return ResponseEntity.ok("Editat cu succes");
        } catch (Exception e) {
            return new ResponseEntity<String>("Eroare salvare vizita", HttpStatus.CONFLICT);
        }
    }

}