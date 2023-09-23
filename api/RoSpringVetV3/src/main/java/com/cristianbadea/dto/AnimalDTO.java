package com.cristianbadea.dto;

public class AnimalDTO {

    private String nume;
	private String specie;
	private String rasa;
    private String imagine;
    private long   stapanId;

    public AnimalDTO(){ super(); }
	public AnimalDTO(String nume, String specie, String rasa, String imagine, long stapanId ) {
		super();
		this.nume = nume;
		this.specie = specie;
		this.rasa = rasa;
		this.imagine = imagine;
        this.stapanId = stapanId;
	}

    public String           getNume         (){ return this.nume;    }
    public String           getSpecie       (){ return this.specie;  }
    public String           getRasa         (){ return this.rasa;    }
    public String           getImagine      (){ return this.imagine; }
    public long             getStapanId     (){ return this.stapanId;   }

    public void             setNume         (String nume)    { this.nume         = nume;     }
    public void             setSpecie       (String specie)  { this.specie       = specie;   }
    public void             setRasa         (String rasa)    { this.rasa         = rasa;     }
    public void             setImagine      (String imagine) { this.imagine      = imagine;  }
    public void             setStapanId     (long   stapanId){ this.stapanId     = stapanId; }
    
}
