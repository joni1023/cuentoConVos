package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.CuentoModel;
import com.example.demo.services.CuentoService;

@RestController
@RequestMapping("/cuentos")
public class CuentoController {
    @Autowired
    CuentoService cuentoService;

    // read
    @CrossOrigin
    @GetMapping()
    public ArrayList<CuentoModel> obtenerCuentos() {
        return cuentoService.obtenerCuento();
    }

    @CrossOrigin
    @GetMapping(path = "/{id}")
    public Optional<CuentoModel> obtenerCuentoPorId(@PathVariable("id") Long id) {
        return cuentoService.obtenerPorId(id);
    }

    // create
    @CrossOrigin
    @PostMapping()
    public CuentoModel guardarCuento(@RequestBody CuentoModel cuento) {
        return cuentoService.guardarCuento(cuento);
    }

    // delete
    @CrossOrigin
    @DeleteMapping(path = "/{id}")
    public String elinarPorId(@PathVariable("id") Long id) {
        boolean ok = cuentoService.eliminarCuento(id);
        if (ok) {
            return "Se elimino correctamente el cuento con id " + id;
        } else {
            return "No se pudo eliminar el cuento con id " + id;
        }
    }
}
