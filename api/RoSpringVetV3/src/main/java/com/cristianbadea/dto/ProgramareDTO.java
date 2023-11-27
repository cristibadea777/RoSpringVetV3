package com.cristianbadea.dto;

public class ProgramareDTO {
    private long    programareId;
    private String  dataProgramare;
	private String  motiv;
    private String  stare;
	private long    stapanId;
    private long    animalId;

    public ProgramareDTO(){ super(); }
    public ProgramareDTO(long programareId, String dataProgramare, String motiv, String stare, long stapanId, long animalId){
        this.dataProgramare = dataProgramare;
        this.motiv          = motiv;
        this.stare          = stare;
        this.stapanId       = stapanId;
        this.animalId       = animalId;
    }
    
    public long   getProgramareId  (){ return this.programareId;  }
    public String getDataProgramare(){ return this.dataProgramare;}
    public String getMotiv         (){ return this.motiv;         } 
    public String getStare         (){ return this.stare;         }
    public long   getStapanId      (){ return this.stapanId;      }
    public long   getAnimalId      (){ return this.animalId;      }

    public void setProgramareId  (long programareId)    { this.programareId    = programareId;   }
    public void setDataProgramare(String dataProgramare){ this.dataProgramare  = dataProgramare; }
    public void setMotiv         (String motiv)         { this.motiv           = motiv;          }
    public void setStare         (String stare)         { this.stare           = stare;          }
    public void setStapanId      (long   stapanId)      { this.stapanId        = stapanId;       }
    public void setAnimalId      (long   animalId)      { this.animalId        = animalId;       }

}
