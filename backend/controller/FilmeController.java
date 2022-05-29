package com.controller;

import java.io.Console;
import java.util.List;

import com.model.Filme;
import com.repository.FilmeRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.beans.BeanUtils;
import lombok.AllArgsConstructor;


@RestController
@RequestMapping("/api/filmes")
@AllArgsConstructor
public class FilmeController {

  private FilmeRepository FilmeRepository;


  @GetMapping("listar")
  @CrossOrigin(origins = "http://localhost:4200")
  public @ResponseBody List<Filme> list() {
    return FilmeRepository.findAll();
  }

  @PostMapping("incluir")
  @CrossOrigin(origins = "http://localhost:4200")
  @ResponseBody
  public Filme incluir(@RequestBody Filme filme) {
       return FilmeRepository.saveAndFlush(filme);
  }

  @DeleteMapping("/deletar/{id}")
  @CrossOrigin(origins = "http://localhost:4200")
  void deletar(@PathVariable Long id) {
    FilmeRepository.deleteById(id);
  }

  @PutMapping("/alterar/{id}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity<Filme> alterar(@PathVariable Long id, @RequestBody Filme todo) {
    Filme filmedb = FilmeRepository.findById(id).get();
    filmedb.setId(todo.getId());
    filmedb.setAutor(todo.getAutor());
    filmedb.setTitulo(todo.getTitulo());
    filmedb.setDescricao(todo.getDescricao());
    Filme modificado = FilmeRepository.save(filmedb);
    return ResponseEntity.ok(modificado);
  }

  @GetMapping("/buscar/{id}")
  @CrossOrigin(origins = "http://localhost:4200")
  public ResponseEntity procurarid(@PathVariable long id) {
    return FilmeRepository.findById(id)
        .map(record -> ResponseEntity.ok().body(record))
        .orElse(ResponseEntity.notFound().build());
  }

}