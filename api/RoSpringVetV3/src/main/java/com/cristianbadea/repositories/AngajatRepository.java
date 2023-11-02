package com.cristianbadea.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Angajat;

import jakarta.transaction.Transactional;

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

    @Modifying
    @Transactional
    @Query(value = "UPDATE angajat a SET a.nume = :nume, a.nr_telefon = :nrTelefon, a.email = :email, a.functie = :functie WHERE a.angajat_id = :angajatId", nativeQuery = true)
    void update(@Param("angajatId") long angajatId, @Param("nume") String nume, @Param("nrTelefon") String nrTelefon, @Param("email") String email, @Param("functie") String functie);
}