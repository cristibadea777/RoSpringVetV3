package com.cristianbadea.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.dto.ProgramareDTO;
import com.cristianbadea.models.Programare;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.services.AuthenticationService;
import com.cristianbadea.services.ProgramareService;
import com.cristianbadea.services.StapanService;

@RestController
@RequestMapping("/programari")
@CrossOrigin("*")
public class ProgramareController {
    
    @Autowired
    private ProgramareService programareService;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private StapanService stapanService;

    @GetMapping("/angajat/getAllProgramari")
    public List<Programare> getAllProgramari(){
        return programareService.getAllProgramari();
    }

    @GetMapping("/stapan/getAllProgramariStapan")
    public List<Programare> getAllProgramariStapan(){
        String username = authenticationService.getUserConectat();
        Stapan stapanId = stapanService.findByEmail(username);
        return programareService.getAllProgramariStapan(stapanId);
    }

    @PostMapping("/angajat/saveProgramare")
    public String saveProgramare(@RequestBody ProgramareDTO programareDTO){
        return programareService.saveProgramare(
            programareDTO.getDataProgramare(),
            programareDTO.getMotiv(),
            programareDTO.getStapan(),
            programareDTO.getAnimal(),
            "confirmata"
        );
    }

}
