package com.cristianbadea.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.StapanRepository;

@Service
public class StapanService {
    
    @Autowired
    private StapanRepository stapanRepository;

    public List<Stapan> getAllStapani(){
        return stapanRepository.findAll();
    }



}
