package com.cristianbadea.dto;

public class VizitaDTO {
    private long    vizitaId;
    private String  dataVizita;
    private long    animalId;
    private long    stapanId;
    private long    angajatId;
    private String  motiv;
    private String  diagnostic;
    private String  metodaTratament;
    private String  dataInceput;
    private String  dataSfarsit;

    public VizitaDTO(){ super(); }
    public VizitaDTO(long vizitaId, String dataVizita, long animalId, long stapanId, long angajatId, String motiv, String diagnostic, String metodaTratament, String dataInceput, String dataSfarsit){
        this.vizitaId        = vizitaId;
        this.dataVizita      = dataVizita;
        this.animalId        = animalId;
        this.stapanId        = stapanId;
        this.angajatId       = angajatId;
        this.motiv           = motiv;
        this.diagnostic      = diagnostic;
        this.metodaTratament = metodaTratament;
        this.dataInceput     = dataInceput;
        this.dataSfarsit     = dataSfarsit;
    }
    public long     getVizitaId         (){ return vizitaId;              }
    public String   getDataVizita       (){ return this.dataVizita;       }
    public long     getAnimalId         (){ return this.animalId;         }
    public long     getStapanId         (){ return this.stapanId;         }
    public long     getAngajatId        (){ return this.angajatId;        }
    public String   getMotiv            (){ return this.motiv;            }
    public String   getDiagnostic       (){ return this.diagnostic;       }
    public String   getMetodaTratament  (){ return this.metodaTratament;  }
    public String   getDataInceput      (){ return this.dataInceput;      }
    public String   getDataSfarsit      (){ return this.dataSfarsit;      }

    public void     setDataVizita       (String dataVizita)      { this.dataVizita      = dataVizita;      }
    public void     setAnimalId         (long animalId)          { this.animalId        = animalId;        }
    public void     setStapanId         (long stapanId)          { this.stapanId        = stapanId;        }
    public void     setAngajatId        (long angajatId)         { this.angajatId       = angajatId;       }
    public void     setMotiv            (String motiv)           { this.motiv           = motiv;           }
    public void     setDiagnostic       (String diagnostic)      { this.diagnostic      = diagnostic;      }           
    public void     setMetodaTratament  (String metodaTratament) { this.metodaTratament = metodaTratament; }
    public void     setDataInceput      (String dataInceput)     { this.dataInceput     = dataInceput;     }
    public void     setDataSfarsit      (String dataSfarsit)     { this.dataSfarsit     = dataSfarsit;     }
    public void setVizitaId             (long vizitaId)          { this.vizitaId        = vizitaId;        }
    

}
