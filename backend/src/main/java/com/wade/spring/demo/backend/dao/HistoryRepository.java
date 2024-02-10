package com.wade.spring.demo.backend.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wade.spring.demo.backend.entity.History;

public interface HistoryRepository extends JpaRepository<History, Long> {

}
