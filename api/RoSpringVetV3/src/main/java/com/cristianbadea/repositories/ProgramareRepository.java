package com.cristianbadea.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.Programare;
import com.cristianbadea.models.Stapan;

@Repository
public interface ProgramareRepository extends JpaRepository<Programare, Long> {
 
    //toate prog. confirmate
	@Query(value = "SELECT * FROM programare WHERE stare='confirmata'", nativeQuery = true)
	List<Programare> findAll();
	
    //toate prog. neconfirmate
	@Query(value = "SELECT * FROM programare WHERE stare='neconfirmata'", nativeQuery = true)
	List<Programare> findAllNeconfirmate();

	//confirmate toti stapanii, cautare dupa data 	--- pentru dashboard
	@Query(value = "SELECT * FROM programare WHERE date LIKE %?1% AND stare='confirmata'", nativeQuery = true)
	List<Programare> findAllByDate(@Param ("date") String date);
	
    //neconfirmate toti stapanii, cautare data 		--- pentru dashboard
	@Query(value = "SELECT * FROM programare WHERE date LIKE %?1% AND stare='neconfirmata'", nativeQuery = true)
	List<Programare> findAllByDateNeconfirmate(@Param ("date") String date);
	
	//stapan neconfirmate
	@Query(value = "SELECT * FROM programare WHERE stapan_id = ?1 AND stare='neconfirmata'", nativeQuery = true)
	List<Programare> findAllByStapanIdNeconfirmata(@Param("stapanId") Stapan stapanId);	
	
    //stapan confirmate
	@Query(value = "SELECT * FROM programare WHERE stapan_id = ?1 AND stare='confirmata'", nativeQuery = true)
	List<Programare> findAllByStapanId(@Param("stapanId") Stapan stapanId);
	
	//animal confirmate
	@Query(value = "SELECT * FROM programare WHERE animal_id = ?1 AND stare='confirmata'", nativeQuery = true)
	List<Programare> findAllByAnimalId(@Param("animalId") Animal animalId);
	//animal neconfirmate
	@Query(value = "SELECT * FROM programare WHERE animal_id = ?1 AND stare='neconfirmata'", nativeQuery = true)
	List<Programare> findAllByAnimalIdNeconfirmate(@Param("animalId") Animal animalId);

	//cautare dupa nume animal - confirmate
	@Query(value = "SELECT * FROM programare WHERE numeanimal LIKE %?1% AND stare='confirmata'", nativeQuery = true)
	List<Programare> findAllByNumeanimalContaining(String text);
	
    //cautare dupa nume animal - neconfirmate
	@Query(value = "SELECT * FROM programare WHERE numeanimal LIKE %?1% AND stare='neconfirmata'", nativeQuery = true)
	List<Programare> findAllByNumeanimalNeconfirmateContaining(String text);

	@Query(value = "SELECT * FROM programare WHERE numestapan LIKE %?1% AND stare='confirmata'", nativeQuery = true)
	List<Programare> findByNumestapanContaining(String text);
	
    //cautare dupa nume stapan - confirmate
	@Query(value = "SELECT * FROM programare WHERE numestapan LIKE %?1% AND stare='neconfirmata'", nativeQuery = true)
	List<Programare> findByNumestapanNeconfirmateContaining(String text);
	
	//toate confirmate pt Stapan din data de
	@Query(value = "SELECT * FROM programare WHERE date LIKE %?1% AND stare='confirmata' AND stapan_id = ?2", nativeQuery = true)
	List<Programare> findAllByDateStapan(String data, @Param("stapanId") Stapan stapanId);
	
}