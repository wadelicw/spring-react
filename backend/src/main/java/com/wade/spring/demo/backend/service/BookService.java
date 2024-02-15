package com.wade.spring.demo.backend.service;

import com.wade.spring.demo.backend.entity.Book;

public interface BookService {
    Book checkoutBook(String userEmail, Long bookId) throws Exception;

    int currentLoansCount(String userEmail);

    Boolean checkoutBookByUser(String userEmail, Long bookId);
}
