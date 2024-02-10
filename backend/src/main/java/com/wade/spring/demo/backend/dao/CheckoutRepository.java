package com.wade.spring.demo.backend.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wade.spring.demo.backend.entity.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Checkout findByUserEmailAndBookId(String userEmail, Long bookId);

    List<Checkout> findBooksByUserEmail(String userEmail);
}
