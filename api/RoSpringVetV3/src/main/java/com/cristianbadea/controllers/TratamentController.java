package com.cristianbadea.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.models.Tratament;
import com.cristianbadea.services.AuthenticationService;
import com.cristianbadea.services.StapanService;
import com.cristianbadea.services.TratamentService;

@RestController
@CrossOrigin("*")
@RequestMapping("/tratamente")
public class TratamentController {
    
    @Autowired
    private TratamentService tratamentService;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private StapanService stapanService;
    
    @GetMapping("/angajat/getAllTratamente")
    public List<Tratament> getAllTratamente(){
        return tratamentService.getAllTratamente();
    }

    @GetMapping("/stapan/getAllTratamenteStapan")
    public List<Tratament> getAllTratamenteStapan(){
        String username = authenticationService.getUserConectat();
        Stapan stapanId = stapanService.findByEmail(username);
        return tratamentService.getAllTratamenteStapan(stapanId);
    }

}
