package com.cristianbadea.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Stapan;

import jakarta.transaction.Transactional;

@Repository
public interface StapanRepository extends JpaRepository<Stapan, Long>{

    Stapan       findByEmail                (String email);
    List<Stapan> findByEmailContaining      (String text);
    List<Stapan> findByNumeContaining       (String text);
	List<Stapan> findByNrTelefonContaining  (String text);

    @Modifying
    @Transactional
    @Query(value = "UPDATE stapan s SET s.nume = :nume, s.nr_telefon = :nrTelefon, s.email = :email WHERE s.stapan_id = :stapanId", nativeQuery = true)
    void update(@Param("stapanId") Long stapanId, @Param("nume") String nume, @Param("nrTelefon") String nrTelefon, @Param("email") String email);
    
}