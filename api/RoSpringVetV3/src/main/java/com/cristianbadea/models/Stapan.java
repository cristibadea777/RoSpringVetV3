package com.cristianbadea.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Stapan extends Persoana{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long             stapanId;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "stapanId")
	@JsonIgnore
	private List<Animal>     animale;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "stapanId")
	@JsonIgnore
	private List<Programare> programari;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "stapanId")
	@JsonIgnore
	private List<Vizita>      vizite;

    public Stapan(){ super(); }
    public Stapan(String nume, String nrTelefon, String email, String imagine, List<Animal> animale, List<Programare> programari, List<Vizita> vizite){
        super(nume, nrTelefon, email, imagine);
        this.animale    = animale;
        this.programari = programari;
        this.vizite     = vizite;    
    }

    public long             getStapanId     (){ return this.stapanId;   }
    public List<Animal>     getAnimale      (){ return this.animale;    }
    public List<Programare> getProgramari   (){ return this.programari; }
    public List<Vizita>     getVizite       (){ return this.vizite;     }
 
    public void setStapanId   (long stapanId)               { this.stapanId = stapanId;     }
    public void setAnimale    (List<Animal> animale)        { this.animale = animale;       }
    public void setProgramari (List<Programare> programari) { this.programari = programari; }
    public void setVizite     (List<Vizita> vizite)         { this.vizite = vizite;         }
    
}