package com.cristianbadea.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cristianbadea.models.ApplicationUser;

import jakarta.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<ApplicationUser, Integer>{
    Optional <ApplicationUser> findByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users SET username = :newEmail WHERE username = :oldEmail", nativeQuery = true)
    void updateEmail(@Param("oldEmail") String oldEmail, @Param("newEmail") String newEmail);

}
