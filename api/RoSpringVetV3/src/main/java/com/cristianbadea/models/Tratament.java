package com.cristianbadea.models;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;
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
	private long tratamentId;
	private String metodaTratament;
	@DateTimeFormat(pattern = "MM/dd/yyyy h:mm a")
	private Date dataInceput;
	@DateTimeFormat(pattern = "MM/dd/yyyy h:mm a")
	private Date dataSfarsit;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "tratamentId")
	private Vizita vizitaId;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "diagnosticId")
	private Diagnostic diagnosticId;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "animalId")
	private Animal animalId;

    public Tratament(){ super(); }
    public Tratament(long tratamentId, String metodaTratament, Date dataInceput, Date dataSfarsit, Vizita vizitaId, Diagnostic diagnosticId, Animal animalId){
        super();
        this.tratamentId        = tratamentId;
        this.metodaTratament    = metodaTratament;
        this.dataInceput        = dataInceput;
        this.dataSfarsit        = dataSfarsit;
        this.vizitaId           = vizitaId;
        this.diagnosticId       = diagnosticId;
        this.animalId           = animalId;
    }

    public long getTratamentId       (){ return tratamentId;        }
    public String getMetodaTratament (){ return metodaTratament;    }
    public Date getDataInceput       (){ return dataInceput;        }
    public Date getDataSfarsit       (){ return dataSfarsit;        }
    public Vizita getVizita          (){ return this.vizitaId;      }
    public Diagnostic geDiagnostic   (){ return this.diagnosticId;  }
    public Animal getAnimal          (){ return this.animalId;      }

    public void setTratamentId      (long tratamentId)        { this.tratamentId = tratamentId;         }
    public void setMetodaTratament  (String metodaTratament)  { this.metodaTratament = metodaTratament; }
    public void setDataInceput      (Date dataInceput)        { this.dataInceput = dataInceput;         }
    public void setDataSfarsit      (Date dataSfarsit)        { this.dataSfarsit = dataSfarsit;         }
    public void setVizita           (Vizita vizitaId)         { this.vizitaId = vizitaId;               }
    public void setDiagnostic       (Diagnostic diagnosticId) { this.diagnosticId = diagnosticId;       }
    public void setAnimal           (Animal animalId)         { this. animalId = animalId;              }        

}
