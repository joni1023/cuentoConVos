package com.example.demo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.CuentoModel;

@Repository
public interface CuentoRepository extends CrudRepository<CuentoModel, Long> {

}
