package com.cristianbadea;

import java.util.HashSet;
import java.util.Set;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cristianbadea.models.Angajat;
import com.cristianbadea.models.Animal;
import com.cristianbadea.models.ApplicationUser;
import com.cristianbadea.models.Role;
import com.cristianbadea.models.Stapan;
import com.cristianbadea.repositories.AngajatRepository;
import com.cristianbadea.repositories.AnimalRepository;
import com.cristianbadea.repositories.RoleRepository;
import com.cristianbadea.repositories.StapanRepository;
import com.cristianbadea.repositories.UserRepository;

@SpringBootApplication
public class RoSpringVetV3Application {

	public static void main(String[] args) {
		SpringApplication.run(RoSpringVetV3Application.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, AngajatRepository angajatRepository){
		return args -> {
			//reinsereaza informatiile (roluri, user admin) de fiecare data la fiecare restart al palicatiei (daca nu exista deja in BD)

			if(roleRepository.findByAuthority("ADMIN").isPresent()) return;
			
			Role adminRole = roleRepository.save(new Role("ADMIN"));
			roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);

			ApplicationUser admin = new ApplicationUser(1, "rospringvet@gmail.com", passwordEncoder.encode("fulger"), roles);
			userRepository.save(admin);
			Angajat angajat = new Angajat("AdminRoSpringVet", "0771287872", "rospringvet@gmail.com", null, "Doctor", null);
			angajatRepository.save(angajat);
			
		};
	}

	@Bean
	CommandLineRunner insertData(AnimalRepository animalRepository, StapanRepository stapanRepository, AngajatRepository angajatRepository){
		return args -> {
			
			try {

				Stapan stapan1 = new Stapan("Cristian", "0771287872", "eu@cristianbadea.online", null, null, null, null);
				Stapan stapan2 = new Stapan("Gabriela", "1234567890", "gabibadea@yahoo.com", null, null, null, null);
				Stapan stapan3 = new Stapan("Georgiana", "098765432", "georgiana@yahoo.com.online", null, null, null, null);
				stapanRepository.save(stapan1);
				stapanRepository.save(stapan2);
				stapanRepository.save(stapan3);

				Animal animal1 = new Animal("Tusa", "pisica", "europeana", null, null, null, null, null);
				Animal animal2 = new Animal("Angora", "pisica", "europeana", null, null, null, null, null);
				Animal animal3 = new Animal("Negru", "pisica", "europeana", null, null, null, null, null);
				Animal animal4 = new Animal("Torky", "pisica", "europeana", null, null, null, null, null);
				Animal animal5 = new Animal("Miuta", "pisica", "europeana", null, null, null, null, null);
				Animal animal6 = new Animal("Jumate", "pisica", "europeana", null, null, null, null, null);
				animal1.setStapan(stapan1);
				animal2.setStapan(stapan2);
				animal3.setStapan(stapan2);
				animal4.setStapan(stapan3);
				animal5.setStapan(stapan1);
				animal6.setStapan(stapan3);
				animalRepository.save(animal1);
				animalRepository.save(animal2);
				animalRepository.save(animal3);
				animalRepository.save(animal4);
				animalRepository.save(animal5);
				animalRepository.save(animal6);
			} catch (Exception e) {
				System.out.println(e.toString());
			}

		};
	}

}
