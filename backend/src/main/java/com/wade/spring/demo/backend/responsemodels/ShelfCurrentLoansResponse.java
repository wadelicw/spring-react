package com.wade.spring.demo.backend.responsemodels;

import com.wade.spring.demo.backend.entity.Book;

import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {

    public ShelfCurrentLoansResponse(Book book, int daysLeft) {
        this.book = book;
        this.daysLeft = daysLeft;
    }

    private Book book;

    private int daysLeft;
}