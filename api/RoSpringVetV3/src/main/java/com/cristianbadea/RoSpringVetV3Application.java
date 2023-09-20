package com.cristianbadea;

import java.util.HashSet;
import java.util.Set;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cristianbadea.models.ApplicationUser;
import com.cristianbadea.models.Role;
import com.cristianbadea.repositories.RoleRepository;
import com.cristianbadea.repositories.UserRepository;

@SpringBootApplication
public class RoSpringVetV3Application {

	public static void main(String[] args) {
		SpringApplication.run(RoSpringVetV3Application.class, args);
	}

	@Bean
	CommandLineRunner run(RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder){
		return args -> {
			//reinsereaza informatiile (roluri, user admin) de fiecare data la fiecare restart al palicatiei (daca nu exista deja in BD)

			if(roleRepository.findByAuthority("ADMIN").isPresent()) return;
			
			Role adminRole = roleRepository.save(new Role("ADMIN"));
			roleRepository.save(new Role("USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(adminRole);

			ApplicationUser admin = new ApplicationUser(1, "admin", passwordEncoder.encode("password"), roles);
			userRepository.save(admin);
		};
	}

}
