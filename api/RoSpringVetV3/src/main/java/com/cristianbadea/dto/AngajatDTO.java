package com.cristianbadea.dto;

public class AngajatDTO {
    
    private long   angajatId;
    private String nume;
    private String nrTelefon;
    private String email;
    private String imagine;
    private String functie;
    private String descriere;
    private String parola;

    public AngajatDTO(){ super(); }
    public AngajatDTO(long angajatId, String nume, String nrTelefon, String email, String imagine, String functie, String descriere, String parola){
        this.angajatId  = angajatId;
        this.nume       = nume;
        this.nrTelefon  = nrTelefon;
        this.email      = email;
        this.imagine    = imagine;
        this.functie    = functie;
        this.descriere  = descriere;
        this.parola     = parola;
    }

    public long   getAngajatId (){ return this.angajatId; }
    public String getNume      (){ return this.nume;      }
    public String getNrTelefon (){ return this.nrTelefon; }
    public String getEmail     (){ return this.email;     }
    public String getImagine   (){ return this.imagine;   } 
    public String getFunctie   (){ return this.functie;   }
    public String getDescriere (){ return this.descriere; }
    public String getParola    (){ return this.parola;    }

    public void setAngajatId (long angajatId)    { this.angajatId = angajatId; }
    public void setNume      (String nume)       { this.nume      = nume;      }
    public void setNrTelefon (String nrTelefon)  { this.nrTelefon = nrTelefon; }
    public void setEmail     (String email)      { this.email     = email;     }
    public void setImagine   (String imagine)    { this.imagine   = imagine;   }
    public void setFunctie   (String functie)    { this.functie   = functie;   }
    public void setDescriere (String descriere)  { this.descriere = descriere; }
    public void setParola    (String parola)     { this.parola    = parola;    }

}
