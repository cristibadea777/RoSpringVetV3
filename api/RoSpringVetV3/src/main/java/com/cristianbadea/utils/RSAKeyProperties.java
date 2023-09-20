package com.cristianbadea.utils;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import org.springframework.stereotype.Component;

@Component
//va fi manageriata de Spring
public class RSAKeyProperties {
    
    private RSAPublicKey publicKey;
    private RSAPrivateKey privateKey;

    public RSAKeyProperties(){
        KeyPair keyPair = KeyGeneratorUtility.generateRsaKey();
        this.publicKey = (RSAPublicKey) keyPair.getPublic();
        this.privateKey = (RSAPrivateKey) keyPair.getPrivate();
    }

    public RSAPublicKey getPublicKey(){ return this.publicKey; }
    public RSAPrivateKey getPrivateKey(){ return this.privateKey; }
    public void setPublicKey(RSAPublicKey publicKey){ this.publicKey = publicKey; }
    public void setPrivateKey(RSAPrivateKey privateKey){ this.privateKey = privateKey; }
}
