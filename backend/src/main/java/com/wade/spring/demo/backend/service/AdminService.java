package com.wade.spring.demo.backend.service;

import com.wade.spring.demo.backend.requestmodels.AddBookRequest;

public interface AdminService {
    void increaseBookQuantity(Long bookId) throws Exception;

    void decreaseBookQuantity(Long bookId) throws Exception;

    void postBook(AddBookRequest addBookRequest);

    void deleteBook(Long bookId) throws Exception;
}
