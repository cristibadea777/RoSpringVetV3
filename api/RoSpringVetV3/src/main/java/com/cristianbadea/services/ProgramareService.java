package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Programare;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.ProgramareRepository;

@Service
public class ProgramareService {
    
    @Autowired
    private ProgramareRepository programareRepository;

    public List<Programare> getAllProgramari(){
        return programareRepository.findAll();
    }

    public List<Programare> getAllProgramariStapan(Stapan stapanId) {
        return programareRepository.findAllByStapanId(stapanId);
    }

}
