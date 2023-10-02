package com.cristianbadea.dto;

public class ProgramareDTO {
    private long    programareId;
    private String  dataProgramare;
	private String  motiv;
	private long    stapanId;
    private long    animalId;

    public ProgramareDTO(){ super(); }
    public ProgramareDTO(String dataProgramare, String motiv, long stapanId, long animalId){
        this.dataProgramare = dataProgramare;
        this.motiv          = motiv;
        this.stapanId       = stapanId;
        this.animalId       = animalId;
    }
    
    public long   getProgramareId  (){ return this.programareId;  }
    public String getDataProgramare(){ return this.dataProgramare;}
    public String getMotiv         (){ return this.motiv;         }
    public long   getStapan        (){ return this. stapanId;     }
    public long   getAnimal        (){ return this.animalId;      }


    public void setProgramareId  (long   programareId)  { this.programareId = programareId;     }    
    public void setDataProgramare(String dataProgramare){ this.dataProgramare = dataProgramare; }
    public void setMotiv         (String motiv)         { this.motiv = motiv;                   }
    public void setStapan        (long   stapanId)      { this.stapanId = stapanId;             }
    public void setAnimal        (long   animalId)      { this.animalId = animalId;             }

}
