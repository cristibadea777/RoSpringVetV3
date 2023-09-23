package com.cristianbadea.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Id;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Diagnostic {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long diagnosticId;
	private String diagnostic;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "diagnosticId")
    @JsonIgnore
	private Vizita vizitaId;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tratamentId")
    @JsonIgnore
    private Tratament tratamentId;

    public Diagnostic(){ super(); }
    public Diagnostic(long diagnosticId, String diagnostic, Vizita vizitaId, Tratament tratamentId){
        this.diagnosticId   = diagnosticId;
        this.diagnostic     = diagnostic;
        this.vizitaId       = vizitaId;
        this.tratamentId    = tratamentId;
    }

    public long      getDiagnosticId (){ return this.diagnosticId; }
    public String    getDiagnostic   (){ return this.diagnostic;   }
    public Vizita    getVizitaId     (){ return this.vizitaId;     }
    public Tratament getTratamentId  (){ return this.tratamentId;  } 

    public void setDiagnosticId (long diagnosticId)     { this.diagnosticId = diagnosticId; }
    public void setDiagnostic   (String diagnostic)     { this.diagnostic = diagnostic;     }
    public void setVizitaId     (Vizita vizitaId)       { this.vizitaId = vizitaId;         }
    public void setTratamentId  (Tratament tratamentId) { this.tratamentId = tratamentId;   }

}