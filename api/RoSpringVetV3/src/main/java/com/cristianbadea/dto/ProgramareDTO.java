package com.cristianbadea.dto;

public class ProgramareDTO {
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
    
    public String getDataProgramare(){ return this.dataProgramare;}
    public String getMotiv         (){ return this.motiv;         }
    public long   getStapanId      (){ return this.stapanId;      }
    public long   getAnimalId      (){ return this.animalId;      }


    public void setDataProgramare(String dataProgramare){ this.dataProgramare = dataProgramare; }
    public void setMotiv         (String motiv)         { this.motiv = motiv;                   }
    public void setStapanId      (long   stapanId)      { this.stapanId = stapanId;             }
    public void setAnimalId      (long   animalId)      { this.animalId = animalId;             }

}
