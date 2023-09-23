package com.cristianbadea.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Stapan;

@Repository
public interface StapanRepository extends JpaRepository<Stapan, Long>{

    Stapan       findByEmail                (String email);
    List<Stapan> findByEmailContaining      (String text);
    List<Stapan> findByNumeContaining       (String text);
	List<Stapan> findByNrTelefonContaining  (String text);
    
}