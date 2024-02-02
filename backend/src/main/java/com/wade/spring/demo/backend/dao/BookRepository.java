package com.wade.spring.demo.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wade.spring.demo.backend.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}