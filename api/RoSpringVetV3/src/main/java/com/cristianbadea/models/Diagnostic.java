package com.cristianbadea.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Id;
@Entity
public class Diagnostic {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long diagnosticId;
	private String diagnostic;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "diagnosticId")
	private Vizita vizitaId;
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "tratamentId")
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
    public Vizita    getVizita       (){ return this.vizitaId;     }
    public Tratament getTratament    (){ return this.tratamentId;  } 

    public void setDiagnosticId (long diagnosticId)     { this.diagnosticId = diagnosticId; }
    public void setDiagnostic   (String diagnostic)     { this.diagnostic = diagnostic;     }
    public void setVizita       (Vizita vizitaId)       { this.vizitaId = vizitaId;         }
    public void setTratament    (Tratament tratamentId) { this.tratamentId = tratamentId;   }

}