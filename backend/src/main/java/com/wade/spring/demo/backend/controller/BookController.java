package com.wade.spring.demo.backend.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wade.spring.demo.backend.entity.Book;
import com.wade.spring.demo.backend.responsemodels.ShelfCurrentLoansResponse;
import com.wade.spring.demo.backend.service.BookService;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@AuthenticationPrincipal UserDetails userDetails)
            throws Exception {
        return bookService.currentLoans(userDetails.getUsername());
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@AuthenticationPrincipal UserDetails userDetails) {
        return bookService.currentLoansCount(userDetails.getUsername());

    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@AuthenticationPrincipal UserDetails userDetails, @RequestParam Long bookId)
            throws Exception {
        return bookService.checkoutBook(userDetails.getUsername(), bookId);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long bookId) {
        return bookService.checkoutBookByUser(userDetails.getUsername(), bookId);
    }

    @PutMapping("/secure/return")
    public void returnBook(@AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long bookId) throws Exception {
        bookService.returnBook(userDetails.getUsername(), bookId);
    }

    @PutMapping("/secure/renew/loan")
    public void renewLoan(@AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long bookId) throws Exception {
        bookService.renewLoan(userDetails.getUsername(), bookId);
    }

}
