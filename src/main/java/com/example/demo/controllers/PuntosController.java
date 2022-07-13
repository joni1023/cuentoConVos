package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.models.PuntosModel;
import com.example.demo.services.PuntosService;

@RestController
@RequestMapping("/puntos")
public class PuntosController {
    @Autowired
    PuntosService puntosService;

    // read
    @CrossOrigin
    @GetMapping()
    public ArrayList<PuntosModel> obtenerPuntos() {
        return puntosService.obtenerPuntos();
    }

    @CrossOrigin
    @GetMapping(path = "/{id}")
    public Optional<PuntosModel> obtenerPuntosPorId(@PathVariable("id") Long id) {
        return puntosService.obtenerPorId(id);
    }

    // create
    @CrossOrigin
    @PostMapping()
    public PuntosModel guardarPuntos(@RequestBody PuntosModel puntos) {
        return puntosService.guardarPuntos(puntos);
    }

    // delete
    @CrossOrigin
    @DeleteMapping(path = "/{id}")
    public String elinarPorId(@PathVariable("id") Long id) {
        boolean ok = puntosService.eliminarPuntos(id);
        if (ok) {
            return "Se elimino correctamente los puntos con id " + id;
        } else {
            return "No se pudo eliminar los puntos con id " + id;
        }
    }

}
