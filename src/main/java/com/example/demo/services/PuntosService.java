package com.example.demo.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.PuntosModel;
import com.example.demo.repositories.PuntosRepository;

@Service
public class PuntosService {
    @Autowired
    PuntosRepository puntosRepository;

    // read
    public ArrayList<PuntosModel> obtenerPuntos() {
        return (ArrayList<PuntosModel>) puntosRepository.findAll();
    }

    public Optional<PuntosModel> obtenerPorId(Long id) {
        return puntosRepository.findById(id);
    }

    // create
    public PuntosModel guardarPuntos(PuntosModel puntos) {
        return puntosRepository.save(puntos);
    }

    // delete
    public boolean eliminarPuntos(Long id) {
        try {
            puntosRepository.deleteById(id);
            return true;
        } catch (Exception error) {
            return false;
        }

    }

}
