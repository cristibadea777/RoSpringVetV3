package com.cristianbadea.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Stapan;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    
    List<Animal> findAllByStapanId(@Param("stapanId") Stapan stapanId);

}
