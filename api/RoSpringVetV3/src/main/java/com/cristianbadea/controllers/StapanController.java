package com.cristianbadea.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.services.StapanService;

@RestController
@RequestMapping("/stapani")
@CrossOrigin("*")
public class StapanController {
    
    @Autowired
    private StapanService stapanService;

    @GetMapping("/angajat/getAllStapani")
    public List<Stapan> getAllStapani(){
        return stapanService.getAllStapani();
    }   


}
