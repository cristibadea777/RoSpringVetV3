package com.cristianbadea.dto;

public class RegistrationDTO {
    private String nume;
    private String telefon;
    private String username;
    private String password;

    public RegistrationDTO(){ 
        super(); 
    }
    public RegistrationDTO(String nume, String telefon, String username, String password){
        super();
        this.nume     = nume;
        this.telefon  = telefon;
        this.username = username;
        this.password = password;
    }

    public String   getNume     (){ return this.nume;     }
    public String   getTelefon  (){ return this.telefon;  }
    public String   getUsername (){ return this.username; }
    public String   getPassword (){ return this.password; }

    public void     setNume     (String nume)    { this.nume     = nume;     }
    public void     setTelefon  (String telefon) { this.telefon  = telefon;  }
    public void     setUsername (String username){ this.username = username; }
    public void     setPassword (String password){ this.password = password; }

}