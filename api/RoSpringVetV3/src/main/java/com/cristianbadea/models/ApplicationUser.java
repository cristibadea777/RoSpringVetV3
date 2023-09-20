package com.cristianbadea.models;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")

public class ApplicationUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Integer userId;
    @Column(unique = true)
    private String username;
    private String password;
    //multe roluri pot avea multi utilizatori; multi utilizatori pot avea multe roluri => trebuie tabel de join
    @ManyToMany(fetch = FetchType.EAGER) //fetch autoritati cat mai devreme dupa ce face fetch userilor
    @JoinTable(
        name = "user_role_junction",
        joinColumns = {@JoinColumn(name="user_id")},
        inverseJoinColumns = {@JoinColumn(name="rle_id")}
    )
    private Set<Role> authorities;

    public ApplicationUser(){
        super();
        this.authorities = new HashSet<Role>();
    }
    public ApplicationUser(Integer userId, String username, String password, Set<Role> authorities){
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    public void setUserId(Integer userId){ this.userId = userId; }
    public Integer getUserId(){ return this.userId; }
    public void setUsername(String username){ this.username = username; }
    @Override
    public String getUsername(){ return this.username; }
    public void setPassword(String password){ this.password = password; }
    @Override
    public String getPassword(){ return this.password; }
    public void setAuthorities(Set<Role> authorities){ this.authorities = authorities; }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() { return this.authorities; }

    @Override
    public boolean isAccountNonExpired() { return true; }
    @Override
    public boolean isAccountNonLocked() { return true; }
    @Override
    public boolean isCredentialsNonExpired() { return true; }
    @Override
    public boolean isEnabled() { return true; }
    
}
