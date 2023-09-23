package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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

}
