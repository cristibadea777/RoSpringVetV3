package com.cristianbadea.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Animal {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long animalId;
	private String nume;
	private String specie;
	private String rasa;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "stapanId")
	@JsonIgnore
	private Stapan stapanId;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "animalId")
	@JsonIgnore
	private List<Vizita> vizite;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "animalId")
	@JsonIgnore
	private List<Programare> programari;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "animalId")
	@JsonIgnore
	private List<Tratament> tratamente;
	private String imagine;
	
    public Animal(){ super(); }
	public Animal(String nume, String specie, String rasa, Stapan stapanId, List<Vizita> vizite, List<Programare> programari, List<Tratament> tratamente, String imagine ) {
		super();
		this.nume = nume;
		this.specie = specie;
		this.rasa = rasa;
		this.stapanId = stapanId;
		this.vizite = vizite;
		this.programari = programari;
		this.tratamente = tratamente;
		this.imagine = imagine;
	}

	public long				getAnimalId		(){	return this.animalId;	}
    public String           getNume         (){ return this.nume;       }
    public String           getSpecie       (){ return this.specie;     }
    public String           getRasa         (){ return this.rasa;       }
    public String           getImagine      (){ return this.imagine;    }
    public Stapan           getStapan       (){ return this.stapanId;   }
    public List<Vizita>     getVizite       (){ return this.vizite;     }
    public List<Programare> getProgramari   (){ return this.programari; }
    public List<Tratament>  getTratamente   (){ return this.tratamente; }

	public void				setAnmalId		(long animalId)					{ this.animalId		= animalId;		}
    public void             setNume         (String nume)                   { this.nume         = nume;         }
    public void             setSpecie       (String specie)                 { this.specie       = specie;       }
    public void             setRasa         (String rasa)                   { this.rasa         = rasa;         }
    public void             setImagine      (String imagine)                { this.imagine      = imagine;      }
    public void             setStapan       (Stapan stapanId)               { this.stapanId     = stapanId;     }
    public void             setVizite       (List<Vizita> vizite)           { this.vizite       = vizite;       }
    public void             setProgramari   (List<Programare> programari)   { this.programari   = programari;   }
    public void             setTratamente   (List<Tratament> tratamente)    { this.tratamente   = tratamente;   }

}