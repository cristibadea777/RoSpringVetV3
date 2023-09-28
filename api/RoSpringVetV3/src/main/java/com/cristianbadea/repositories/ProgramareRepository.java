package com.cristianbadea.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Programare;
import com.cristianbadea.models.Stapan;


@Repository
public interface ProgramareRepository extends JpaRepository<Programare, Long> {

    List<Programare> findAllByStapanId(@Param("stapanId") Stapan stapanId);
 	
}