package com.cristianbadea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Vizita;

@Repository
public interface VizitaRepository extends JpaRepository<Vizita, Long> {
    
}
