package com.cristianbadea.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.models.Vizita;

@Repository
public interface VizitaRepository extends JpaRepository<Vizita, Long> {
    
    List<Vizita> findAllByStapanId(@Param("stapanId") Stapan stapanId);
    List<Vizita> findAllByAnimalId(@Param("animalId") Animal animalId);

}
