package com.cristianbadea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Diagnostic;

@Repository
public interface DiagnosticRepository extends JpaRepository<Diagnostic, Long> { 
    
}