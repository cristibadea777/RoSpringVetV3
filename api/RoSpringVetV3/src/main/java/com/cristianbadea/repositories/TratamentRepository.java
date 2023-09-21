package com.cristianbadea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Tratament;

@Repository
public interface TratamentRepository extends JpaRepository<Tratament, Long>{
    
}
