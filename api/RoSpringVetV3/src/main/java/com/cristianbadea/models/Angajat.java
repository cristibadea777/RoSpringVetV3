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
public class Angajat extends Persoana {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long angajatId;
	private String functie;
	private String descriere;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "angajatId")
	@JsonIgnore
	private List<Vizita> vizite;

    public Angajat(){ super(); }
    public Angajat(String nume, String nrTelefon, String email, String imagine, long angajatId, String functie, String descriere, List<Vizita> vizite){
        super(nume, nrTelefon, email, imagine);
        this.angajatId  = angajatId;
        this.functie    = functie;
        this.descriere  = descriere;
        this.vizite     = vizite;
    }

    public long         getAnagajatId (){ return this.angajatId; }
    public String       getFunctie    (){ return this.functie;   }
    public String       getDescriere  (){ return this.descriere; }
    public List<Vizita> getVizite     (){ return this.vizite;    }

    public void setAngajatId (long angajatId)      { this.angajatId = angajatId;  }
    public void setFunctie   (String functie)      { this.functie = functie;      }
    public void setDescriere (String descriere)    { this.descriere = descriere;  }
    public void setVizite    (List<Vizita> vizite) { this.vizite = vizite;        }

}
