package com.cristianbadea.models;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class Persoana {

    private String nume;
    private String nrTelefon;
    @Column(unique = true, length = 32)
    private String email;
    private String imagine;
    
    public Persoana(){ super(); }
    public Persoana(String nume, String nrTelefon, String email, String imagine){
        super();
        this.nume       = nume;
        this.nrTelefon  = nrTelefon;
        this.email      = email;
        this.imagine    = imagine;
    }

    public String getNume      (){ return this.nume;      }
    public String getNrTelefon (){ return this.nrTelefon; }
    public String getEmail     (){ return this.email;     }
    public String  imagine     (){ return this.imagine;   } 

    public void setNume      (String nume)       { this.nume = nume;           }
    public void setNrTelefon (String nrTelefon)  { this.nrTelefon = nrTelefon; }
    public void setEmail     (String email)      { this.email = email;         }
    public void setImagine   (String imagine)    { this.imagine = imagine;     }
}