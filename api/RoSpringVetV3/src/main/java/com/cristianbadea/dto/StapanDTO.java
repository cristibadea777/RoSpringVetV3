package com.cristianbadea.dto;

public class StapanDTO {
    private long   stapanId;
    private String nume;
    private String email;
    private String parola;
    private String nrTelefon;
    private String imagine;

    public StapanDTO(){ super(); }
    public StapanDTO(long stapanId, String nume, String email, String parola, String nrTelefon, String imagine){
        super();
        this.stapanId   = stapanId;
        this.nume       = nume;
        this.email      = email;
        this.parola     = parola;
        this.nrTelefon  = nrTelefon;
        this.imagine    = imagine;
    }

    public long   getStapanId (){ return this.stapanId;  }
    public String getNume     (){ return this.nume;      }
    public String getEmail    (){ return this.email;     }
    public String getParola   (){ return this.parola;    }
    public String getNrTelefon(){ return this.nrTelefon; } 
    public String getImagine  (){ return this.imagine;   }

    public void setStapanId (long   stapanId) { this.stapanId  = stapanId;  }
    public void setNume     (String nume)     { this.nume      = nume;      }
    public void setEmail    (String email)    { this.email     = email;     }    
    public void setParola   (String parola)   { this.parola    = parola;    }
    public void setNrTelefon(String nrTelefon){ this.nrTelefon = nrTelefon; }
    public void setImagine  (String imagine)  { this.imagine   = imagine;   }
}