package com.example.demo.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.models.CuentoModel;
import com.example.demo.repositories.CuentoRepository;

@Service
public class CuentoService {
    @Autowired
    CuentoRepository cuentoRepository;

    // read
    public ArrayList<CuentoModel> obtenerCuento() {
        return (ArrayList<CuentoModel>) cuentoRepository.findAll();
    }

    public Optional<CuentoModel> obtenerPorId(Long id) {
        return cuentoRepository.findById(id);
    }

    // create
    public CuentoModel guardarCuento(CuentoModel cuento) {
        return cuentoRepository.save(cuento);
    }

    // delete
    public boolean eliminarCuento(Long id) {
        try {
            cuentoRepository.deleteById(id);
            return true;
        } catch (Exception error) {
            return false;
        }

    }

}
