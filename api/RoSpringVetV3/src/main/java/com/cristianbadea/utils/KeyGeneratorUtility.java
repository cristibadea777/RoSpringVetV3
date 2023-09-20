package com.cristianbadea.utils;

import java.security.KeyPair;
import java.security.KeyPairGenerator;

public class KeyGeneratorUtility {
    
    public static KeyPair generateRsaKey(){
        //pt JWT ne trebuie o cheie de encriptare/decriptare a tokenurilor generata cu algoritmul RSA
        KeyPair keypair;
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            keypair = keyPairGenerator.generateKeyPair();
        } catch (Exception e) {
            throw new IllegalStateException();
        }
        return keypair;
    }



    

}
