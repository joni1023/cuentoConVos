package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.PuntosModel;

@Repository
public interface PuntosRepository extends CrudRepository<PuntosModel, Long> {

}
