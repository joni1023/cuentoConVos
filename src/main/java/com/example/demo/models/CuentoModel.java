package com.example.demo.models;

import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "cuento")
public class CuentoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String autor;
    @Column(length = 800)
    private String cuerpo;
    private String titulo;
    private String imagen;
    @Column(length = 255)
    private String reseña;
    @OneToMany(mappedBy = "cuento", cascade = { CascadeType.ALL })
    private List<PuntosModel> puntos;

    public String getReseña() {
        return reseña;
    }

    public void setReseña(String reseña) {
        this.reseña = reseña;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Long getId() {
        return id;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getCuerpo() {
        return cuerpo;
    }

    public void setCuerpo(String cuerpo) {
        this.cuerpo = cuerpo;
    }

    public List<PuntosModel> getPuntos() {
        return puntos;
    }

    public void setPuntos(List<PuntosModel> puntos) {
        this.puntos = puntos;
    }

}
