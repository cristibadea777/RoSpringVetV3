package com.cristianbadea.dto;

public class RaspunsPozaDTO {
    private String raspuns;
    private String numePoza;
    
    public RaspunsPozaDTO(){ super(); }
    
    public RaspunsPozaDTO(String raspuns, String numePoza){ 
        this.raspuns  = raspuns;
        this.numePoza = numePoza; 
    }
    public void setRaspuns (String raspuns ){ this.raspuns  = raspuns;  }
    public void setNumePoza(String numePoza){ this.numePoza = numePoza; }
    
    public String getRaspuns (){ return this.raspuns;  }
    public String getNumePoza(){ return this.numePoza; }
}