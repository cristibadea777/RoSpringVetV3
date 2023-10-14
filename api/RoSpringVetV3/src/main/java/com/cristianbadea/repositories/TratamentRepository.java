package com.cristianbadea.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Tratament;

@Repository
public interface TratamentRepository extends JpaRepository<Tratament, Long>{



	//Toate tratamentele (active si inactive) ale animalelor unui stapan, dand ca parametru ID-ul stapanului.
    @Query(	value = 	 "SELECT t.*, a.nume, a.stapan_id, a.animal_id as a_id FROM tratament as t INNER JOIN animal as a ON t.animal_id = a.animal_id WHERE a.stapan_id = ?1", 
			countQuery = "SELECT count(*) FROM tratament as t INNER JOIN animal as a ON t.animal_id = a.animal_id WHERE a.stapan_id = ?1",
			nativeQuery = true)
    List<Tratament> findAllByStapanId(@Param("stapanId") long stapanId); //nu mai merge cu entitatea in Query in Spring Boot 3 - trebuie dat id-ul in mod direct
    
	
	//Toate tratamentele (active si inactive) ale unui animal 
    @Query(	value = 	 "SELECT t.*, a.nume, a.stapan_id, a.animal_id as a_id FROM tratament as t INNER JOIN animal as a ON t.animal_id = a.animal_id WHERE a.animal_id = ?1", 
			countQuery = "SELECT count(*) FROM tratament as t INNER JOIN animal as a ON t.animal_id = a.animal_id WHERE a.animal_id = ?1",
			nativeQuery = true)
    List<Tratament> findAllByAnimalId(@Param("animalId") long animalId); //nu mai merge cu entitatea in Query in Spring Boot 3 - trebuie dat id-ul in mod direct
    
	//TODO: luat tratamente AZI - nu imi trebuie toate tratamentele din toate timpurile
	//in controller sa returnez doar cele de azi

	@Query(value = "SELECT * FROM tratament WHERE STR_TO_DATE(data_sfarsit, '%Y-%m-%d') > CURRENT_DATE", nativeQuery = true)
	List<Tratament> findAllActive();

}
