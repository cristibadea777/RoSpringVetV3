package com.cristianbadea.services;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cristianbadea.dto.RaspunsPozaDTO;
import com.cristianbadea.models.Angajat;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.AngajatRepository;
import com.cristianbadea.repositories.AnimalRepository;
import com.cristianbadea.repositories.StapanRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PozeService {

    @Autowired
    private AnimalRepository    animalRepository;
    @Autowired
    private StapanRepository    stapanRepository;
    @Autowired
    private AngajatRepository   angajatRepository;

    @Value("${external.resources.path}")
	private String path;
    
    public ResponseEntity<String> salveazaPoza(String folderPoza, String numePozaDB, String base64String, String entitate){

        String calePoza     = path + folderPoza + "/" + numePozaDB;  
        long   idEntitate   = Long.valueOf(numePozaDB);
        ObjectMapper   objectMapper   = new ObjectMapper();
        RaspunsPozaDTO raspunsPozaDTO = new RaspunsPozaDTO();

        try {
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
            
            switch (entitate) {
                case "animal":
                    Animal animal = animalRepository.findById(idEntitate).get();
                    animal.setImagine(numePozaDB);
                    animalRepository.save(animal);
                    break;
                case "stapan":
                    Stapan stapan = stapanRepository.findById(idEntitate).get();
                    stapan.setImagine(numePozaDB);
                    stapanRepository.save(stapan);
                    break;
                case "angajat":
                    Angajat angajat = angajatRepository.findById(idEntitate).get();
                    angajat.setImagine(numePozaDB);
                    angajatRepository.save(angajat);
                    break;
                default:
                    return new ResponseEntity<String>("Eroare - entitate necunoscută", HttpStatus.CONFLICT);
            }

            raspunsPozaDTO.setRaspuns("Poză salvată cu succes");
            raspunsPozaDTO.setNumePoza(numePozaDB);
            return ResponseEntity.ok(objectMapper.writeValueAsString(raspunsPozaDTO));
            
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<String>("Eroare salvare poză în folder", HttpStatus.CONFLICT);
        }

    }

}
