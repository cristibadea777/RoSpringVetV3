package com.cristianbadea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.dto.PozaDTO;
import com.cristianbadea.services.PozeService;

@RestController
@RequestMapping("/poze")
public class PozeController {

    @Autowired
    private PozeService         pozeService;
    
    @PostMapping("/salvarePoza")
    public String salvarePoza(@RequestBody PozaDTO pozaDTO){

            String folderPoza   = pozaDTO.getFolder();
            String numePozaDB   = pozaDTO.getNumePoza();
            String base64String = pozaDTO.getBase64String();
            String entitate     = pozaDTO.getEntitate();
    
            return pozeService.salveazaPoza(folderPoza, numePozaDB, base64String, entitate);
    }

}
