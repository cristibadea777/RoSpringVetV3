package com.cristianbadea.models;

import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public class Data {
    
    @DateTimeFormat(pattern = "MM/dd/yyyy h:mm a")
    private Date date;

    public Data(){
        super();
    }
    public Data(Date date){
        super();
        this.date = date;
    }

    public Date getDate()           { return this.date; }
    public void setDate(Date date)  { this.date = date; }

}