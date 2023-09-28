package com.cristianbadea.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Angajat;

@Repository
public interface AngajatRepository extends JpaRepository<Angajat, Long>{
    
    
    @Query(value = "SELECT * FROM angajat WHERE angajat.functie != 'PLECAT' ", nativeQuery = true)
    List<Angajat> findAll();
    @Query(value = "SELECT * FROM angajat WHERE angajat.functie = 'PLECAT' ", nativeQuery = true)
    List<Angajat> findAllPlecati();
    
    Angajat             findByEmail               (String email);
    List<Angajat>       findByEmailContaining     (String text);
    List<Angajat>       findByNumeContaining      (String text);
    List<Angajat>       findByNrTelefonContaining (String text);
    
}