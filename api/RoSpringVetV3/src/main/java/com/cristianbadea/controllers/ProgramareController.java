package com.cristianbadea.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.models.Programare;
import com.cristianbadea.services.ProgramareService;

@RestController
@RequestMapping("/programari")
@CrossOrigin("*")
public class ProgramareController {
    
    @Autowired
    private ProgramareService programareService;

    @GetMapping("/angajat/getAllProgramari")
    public List<Programare> getAllProgramari(){
        return programareService.getAllProgramari();
    }

}
