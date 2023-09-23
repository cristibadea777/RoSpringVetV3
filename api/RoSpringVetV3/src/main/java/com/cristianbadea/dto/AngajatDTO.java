package com.cristianbadea.dto;

public class AngajatDTO {
    
    private String nume;
    private String nrTelefon;
    private String email;
    private String imagine;
    private String functie;
    private String descriere;

    public AngajatDTO(){ super(); }
    public AngajatDTO(String nume, String nrTelefon, String email, String imagine, String functie, String descriere){
        this.nume       = nume;
        this.nrTelefon  = nrTelefon;
        this.email      = email;
        this.imagine    = imagine;
        this.functie    = functie;
        this.descriere  = descriere;
    }

    public String getNume      (){ return this.nume;      }
    public String getNrTelefon (){ return this.nrTelefon; }
    public String getEmail     (){ return this.email;     }
    public String getImagine   (){ return this.imagine;   } 
    public String getFunctie   (){ return this.functie;   }
    public String getDescriere (){ return this.descriere; }

    public void setNume      (String nume)       { this.nume = nume;           }
    public void setNrTelefon (String nrTelefon)  { this.nrTelefon = nrTelefon; }
    public void setEmail     (String email)      { this.email = email;         }
    public void setImagine   (String imagine)    { this.imagine = imagine;     }
    public void setFunctie   (String functie)    { this.functie = functie;     }
    public void setDescriere (String descriere)  { this.descriere = descriere; }

}
