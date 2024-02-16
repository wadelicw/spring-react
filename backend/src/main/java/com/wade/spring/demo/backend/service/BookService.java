package com.wade.spring.demo.backend.service;

import java.util.List;

import com.wade.spring.demo.backend.entity.Book;
import com.wade.spring.demo.backend.responsemodels.ShelfCurrentLoansResponse;

public interface BookService {
    Book checkoutBook(String userEmail, Long bookId) throws Exception;

    int currentLoansCount(String userEmail);

    Boolean checkoutBookByUser(String userEmail, Long bookId);

    List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception;

    void returnBook(String userEmail, Long bookId) throws Exception;

    void renewLoan(String userEmail, Long bookId) throws Exception;
}
