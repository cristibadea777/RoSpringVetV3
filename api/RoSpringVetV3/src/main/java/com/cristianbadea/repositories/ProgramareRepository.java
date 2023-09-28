package com.cristianbadea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Programare;


@Repository
public interface ProgramareRepository extends JpaRepository<Programare, Long> {
 	
}