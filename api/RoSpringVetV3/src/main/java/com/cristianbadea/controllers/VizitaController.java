package com.cristianbadea.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.dto.VizitaDTO;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.models.Vizita;
import com.cristianbadea.services.AuthenticationService;
import com.cristianbadea.services.StapanService;
import com.cristianbadea.services.VizitaService;

@RestController
@RequestMapping("/vizite")
@CrossOrigin("*")
public class VizitaController {
   
    @Autowired
    VizitaService vizitaService;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    StapanService stapanService;
    
    @GetMapping("/angajat/getAllVizite")
    public List<Vizita> getAllVizite(){
        return vizitaService.getAllVizite();
    }

    @PostMapping("/angajat/saveVizita")
    public String saveVizita(@RequestBody VizitaDTO vizitaDTO){
        return vizitaService.saveVizita(
            vizitaDTO.getDataVizita(), 
            vizitaDTO.getAnimalId(), 
            vizitaDTO.getStapanId(), 
            vizitaDTO.getAngajatId(), 
            vizitaDTO.getMotiv(), 
            vizitaDTO.getDiagnostic(), 
            vizitaDTO.getMetodaTratament(), 
            vizitaDTO.getDataInceput(), 
            vizitaDTO.getDataSfarsit()
        );
    }

    @GetMapping("/stapan/getAllViziteStapan")
    public List<Vizita> getAllViziteStapan(){
        String username = authenticationService.getUserConectat();
        Stapan stapanId = stapanService.findByEmail(username);
        return vizitaService.getAllViziteStapan(stapanId);
    }

}
