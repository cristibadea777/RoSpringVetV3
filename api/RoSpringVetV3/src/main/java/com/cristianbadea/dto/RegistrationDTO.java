package com.cristianbadea.dto;

public class RegistrationDTO {
    //creata pt inregistrare - pt a nu pasa /auth/register un intreg ApplicationUser de fiecare data cand se inregistreaza un user nou, pt ca ne trebuie doar userul si parola
    private String username;
    private String password;

    public RegistrationDTO(){ 
        super(); 
    }
    public RegistrationDTO(String username, String password){
        super();
        this.username = username;
        this.password = password;
    }

    public String getUsername(){ return username; }
    public void setUsername(String username){ this.username = username; }
    public String getPassword(){ return password; }
    public void setPassword(String password){ this.password = password; }

    @Override
    public String toString(){
        return "~~~~~~~@@@@@@@~~~~~~~\nRegistration details: \nUsername: " + this.username + "\nPassword: " + this.password + "\n~~~~~~~@@@@@@@~~~~~~~";
    }

}
