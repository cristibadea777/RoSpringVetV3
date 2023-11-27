package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Tratament;
import com.cristianbadea.repositories.TratamentRepository;

@Service
public class TratamentService {
    
    @Autowired
    private TratamentRepository tratamentRepository;

    public List<Tratament> getAllTratamente(){
        return tratamentRepository.findAll();
    }

    public List<Tratament> getAllTratamenteActive(){
        return tratamentRepository.findAllActive();
    }

    public List<Tratament> getAllTratamenteStapan(long stapanId){
        return tratamentRepository.findAllByStapanId(stapanId);
    }

    public ResponseEntity<String> editTratament(long tratamentId, String metodaTratament, String dataSfarsit) {
        Tratament tratament = tratamentRepository.findById(tratamentId).get();
        tratament.setDataSfarsit(dataSfarsit);
        tratament.setMetodaTratament(metodaTratament);
        tratamentRepository.save(tratament);
        return ResponseEntity.ok("Tratament editat");
    }

}
