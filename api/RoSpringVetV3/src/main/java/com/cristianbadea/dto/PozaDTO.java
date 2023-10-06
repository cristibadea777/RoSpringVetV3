package com.cristianbadea.dto;

public class PozaDTO {
    
    private String base64String;
    private String folder;
    private String numePoza;
    private String entitate;

    public PozaDTO(){
        super();
    }

    public PozaDTO(String base64String, String folder, String numePoza, String entitate){
        this.base64String = base64String;
        this.folder       = folder;
        this.numePoza     = numePoza;
        this.entitate     = entitate;
    }

    public String getBase64String(){ return this.base64String; }
    public String getFolder      (){ return this.folder;       }
    public String getNumePoza    (){ return this.numePoza;     }
    public String getEntitate    (){ return this.entitate;     }

    public void setBase64String(String base64String){ this.base64String = base64String; }
    public void setFolder      (String folder)      { this.folder       = folder;       }
    public void setNumePoza    (String numePoza)    { this.numePoza     = numePoza;     }
    public void setEntitate    (String entitate)    { this.entitate     = entitate;     }

}