package com.cristianbadea.dto;

public class TratamentDTO {
    private long   tratamentId;
    private String metodaTratament;
    private String dataSfarsit;
    
    public long   getTratamentId()     { return tratamentId;     }
    public String getMetodaTratament() { return metodaTratament; }
    public String getDataSfarsit()     { return dataSfarsit;     }

    public void setTratamentId(long tratamentId)           { this.tratamentId = tratamentId;         }      
    public void setMetodaTratament(String metodaTratament) { this.metodaTratament = metodaTratament; }
    public void setDataSfarsit(String dataSfarsit)         { this.dataSfarsit = dataSfarsit;         }
    
}
