package com.cristianbadea.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Vizita{
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long        vizitaId;
    private String      dataVizita;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "animalId")
	private Animal      animalId;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "stapanId")
	private Stapan      stapanId;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "angajatId")
	private Angajat     angajatId;
	private String      numeStapan;
	private String      numeAnimal;
	private String      numeAngajat;
	private String      motiv;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "diagnosticId")
    private Diagnostic  diagnosticId;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tratamentId")
    private Tratament   tratamentId;

    public Vizita(){ super(); }
    public Vizita(String dataVizita, Animal animalId, Stapan stapanId, Angajat angajatId, String numeStapan, String numeAnimal, String numeAngajat, String motiv, Diagnostic diagnosticId, Tratament tratamentId){
        this.dataVizita     = dataVizita;
        this.animalId       = animalId;
        this.stapanId       = stapanId;
        this.angajatId      = angajatId;
        this.numeStapan     = numeStapan;
        this.numeAnimal     = numeAnimal;
        this.numeAngajat    = numeAngajat;
        this.motiv          = motiv;
        this.diagnosticId   = diagnosticId;
        this.tratamentId    = tratamentId;
    }

    public long         getVizitaId       (){ return this.vizitaId;       }
    public String       getDataVizita     (){ return this.dataVizita;     }
    public Animal       getAnimalId       (){ return this.animalId;       }
    public Stapan       getStapanId       (){ return this.stapanId;       }
    public Angajat      getAngajatId      (){ return this.angajatId;      }
    public String       getNumeStapan     (){ return this.numeStapan;     }
    public String       getNumeAnimal     (){ return this.numeAnimal;     }
    public String       getNumeAngajat    (){ return this.numeAngajat;    }
    public String       getMotiv          (){ return this.motiv;          }
    public Diagnostic   getDiagnostic     (){ return this.diagnosticId;   }
    public Tratament    getTratament      (){ return this.tratamentId;    }

    public void setVizitaId      (long vizitaId)            { this.vizitaId = vizitaId;         }
    public void setDataVizita    (String dataVizita)        { this.dataVizita = dataVizita;     }
    public void setAnimalId      (Animal animalId)          { this.animalId = animalId;         }
    public void setStapanId      (Stapan stapanId)          { this.stapanId = stapanId;         }
    public void setAngajatId     (Angajat angajatId)        { this.angajatId = angajatId;       }
    public void setNumeStapan    (String numeStapan)        { this.numeStapan = numeStapan;     }
    public void setNumeAnimal    (String numeAnimal)        { this.numeAnimal = numeAnimal;     }
    public void setNumeAngajat   (String numeAngajat)       { this.numeAngajat = numeAngajat;   }
    public void setMotiv         (String motiv)             { this.motiv = motiv;               }
    public void setDiagnosticId  (Diagnostic diagnosticId)  { this.diagnosticId = diagnosticId; }
    public void setTratamentId   (Tratament tratamentId)    { this.tratamentId = tratamentId;   }

}
