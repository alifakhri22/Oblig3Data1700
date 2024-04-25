package com.example.oblig3;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;
    public void lagreBilletter(Billett innBillett){
        String sql = "INSERT INTO Kinotabell (film, antall, fornavn, etternavn, tlf, epost) VALUES(?,?,?,?,?,?)";

        db.update(sql,innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(),innBillett.getEtternavn(), innBillett.getTlf(), innBillett.getEpost());
    }
    public List<Billett> hentAlt(){
        String sql = "Select * From Kinotabell ORDER BY etternavn";
        List<Billett> alleBilletter = db.query(sql,new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public void slettBilletter() {
        String sql = "DELETE FROM Kinotabell";
        db.update(sql);
    }
}