package com.cristianbadea.controllers;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.cristianbadea.dto.PozaDTO;
import com.cristianbadea.models.Angajat;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.AngajatRepository;
import com.cristianbadea.repositories.AnimalRepository;
import com.cristianbadea.repositories.StapanRepository;

@RestController
@RequestMapping("/poze")
public class PozeController {

    @Autowired
    private AnimalRepository    animalRepository;
    @Autowired
    private StapanRepository    stapanRepository;
    @Autowired
    private AngajatRepository   angajatRepository;

    @Value("${external.resources.path}")
	private String path;
    
    @PostMapping("/salvarePoza")
    public String salvarePoza(@RequestBody PozaDTO pozaDTO){
        try {
            String calePoza = path + pozaDTO.getFolder() + "/" + pozaDTO.getNumePoza();
            String numePozaDB = pozaDTO.getNumePoza();
            String base64String = pozaDTO.getBase64String();

            String[] prefixuriBase64  = {"data:image/png;base64,", "data:image/jpg;base64,", "data:image/jpeg;base64,"};
            String[] formate          = {".png", ".jpg", ".jpeg"};
            for(int i = 0; i < prefixuriBase64.length; i++){
                if(base64String.startsWith(prefixuriBase64[i])){
                    base64String = base64String.substring(prefixuriBase64[i].length());
                    calePoza     = calePoza   + formate[i];
                    numePozaDB   = numePozaDB + formate[i];
                    break;
                }
            }

            byte[] decodedImage = Base64.getDecoder().decode(base64String);
            Files.write(Paths.get(calePoza), decodedImage);

            switch (pozaDTO.getEntitate()) {
                case "animal":
                    Animal animal = animalRepository.findById(Long.valueOf(pozaDTO.getNumePoza())).get();
                    animal.setImagine(numePozaDB);
                    animalRepository.save(animal);
                    break;
                case "stapan":
                    Stapan stapan = stapanRepository.findById(Long.valueOf(pozaDTO.getNumePoza())).get();
                    stapan.setImagine(numePozaDB);
                    stapanRepository.save(stapan);
                    break;
                case "angajat":
                    Angajat angajat = angajatRepository.findById(Long.valueOf(pozaDTO.getNumePoza())).get();
                    angajat.setImagine(numePozaDB);
                    angajatRepository.save(angajat);
                    break;
                default:
                    return "Eroare salvare in baza de date";
            }

            return "Poză salvată cu succes";
        } catch (Exception e) {
            System.out.println("Eroare salvare poza \n" + e);
            return "Eroare";
        }
    }

}
