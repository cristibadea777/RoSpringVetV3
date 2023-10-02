package com.cristianbadea.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Programare{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long    programareId;
    private String  dataProgramare;
	private String  motiv;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "stapanId")
	private Stapan  stapanId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "animalId")
	private Animal  animalId;
	private String  stare;

    public Programare(){ super(); }
    public Programare(String dataProgramare, String motiv, Stapan stapanId, Animal animalId, String stare){
        this.dataProgramare = dataProgramare;
        this.motiv          = motiv;
        this.stapanId       = stapanId;
        this.animalId       = animalId;
        this.stare          = stare;
    }
    
    public long   getProgramareId  (){ return this.programareId;  }
    public String getDataProgramare(){ return this.dataProgramare;}
    public String getMotiv         (){ return this.motiv;         }
    public Stapan getStapanId      (){ return this. stapanId;     }
    public Animal getAnimalId      (){ return this.animalId;      }
    public String getStare         (){ return this.stare;         }

    public void setProgramareId  (long   programareId)  { this.programareId   = programareId;   }    
    public void setDataProgramare(String dataProgramare){ this.dataProgramare = dataProgramare; }
    public void setMotiv         (String motiv)         { this.motiv          = motiv;          }
    public void setStapanId      (Stapan stapanId)      { this.stapanId       = stapanId;       }
    public void setAnimalId      (Animal animalId)      { this.animalId       = animalId;       }
    public void setStare         (String stare)         { this.stare          = stare;          }
}
