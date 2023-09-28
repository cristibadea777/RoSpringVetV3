package com.cristianbadea.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.models.Tratament;

@Repository
public interface TratamentRepository extends JpaRepository<Tratament, Long>{

	//Toate tratamentele (active si vechi) ale animalelor unui stapan, dand ca parametru ID-ul stapanului.
    @Query(	value = 	 "SELECT t.*, a.* FROM tratament as t INNER JOIN animal as a ON t.animal_id = a.animal_id WHERE a.stapan_id = ?1", 
			countQuery = "SELECT count(*) FROM tratament as t INNER JOIN animal as a ON t.animal_id = a.animal_id WHERE a.stapan_id = ?1",
			nativeQuery = true)
    List<Tratament> findAllByStapanId(@Param("stapanId") Stapan stapanId);
    
}
