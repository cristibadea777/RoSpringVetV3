package com.cristianbadea.models;

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
import jakarta.persistence.OneToOne;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Tratament {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long        tratamentId;
	private String      metodaTratament;
	private String      dataInceput;
	private String      dataSfarsit;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "vizitaId")
    @JsonIgnore
    private Vizita      vizitaId;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "diagnosticId")
    private Diagnostic  diagnosticId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "animalId")
	private Animal      animalId;
    

    public Tratament(){ super(); }
    public Tratament(String metodaTratament, String dataInceput, String dataSfarsit, Diagnostic diagnosticId, Animal animalId){
        super();
        this.metodaTratament = metodaTratament;
        this.dataInceput     = dataInceput;
        this.dataSfarsit     = dataSfarsit;
        this.diagnosticId    = diagnosticId;
        this.animalId        = animalId;
    }

    public long       getTratamentId     (){ return tratamentId;       }
    public String     getMetodaTratament (){ return metodaTratament;   }
    public String     getDataInceput     (){ return dataInceput;       }
    public String     getDataSfarsit     (){ return dataSfarsit;       }
    public Vizita     getVizitaId        (){ return this.vizitaId;     }
    public Diagnostic geDiagnosticId     (){ return this.diagnosticId; }
    public Animal     getAnimalId        (){ return this.animalId;     }

    public void setTratamentId     (long tratamentId)        { this.tratamentId = tratamentId;         }
    public void setMetodaTratament (String metodaTratament)  { this.metodaTratament = metodaTratament; }
    public void setDataInceput     (String dataInceput)      { this.dataInceput = dataInceput;         }
    public void setDataSfarsit     (String dataSfarsit)      { this.dataSfarsit = dataSfarsit;         }
    public void setVizitaId        (Vizita vizitaId)         { this.vizitaId = vizitaId;               }
    public void setDiagnosticId    (Diagnostic diagnosticId) { this.diagnosticId = diagnosticId;       }
    public void setAnimalId        (Animal animalId)         { this. animalId = animalId;              }        

}
