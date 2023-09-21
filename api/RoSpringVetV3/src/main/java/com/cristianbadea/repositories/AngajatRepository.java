package com.cristianbadea.repositories;

import java.util.List;
import java.util.Optional;

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
    
    Optional<Angajat>   findByEmail               (String email);
    List<Angajat>       findByEmailContaining     (String text);
    List<Angajat>       findByNameContaining      (String text);
    List<Angajat>       findByNrtelefonContaining (String text);

    
}
