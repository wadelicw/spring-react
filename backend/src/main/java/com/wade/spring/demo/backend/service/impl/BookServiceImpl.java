package com.wade.spring.demo.backend.service.impl;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.wade.spring.demo.backend.dao.BookRepository;
import com.wade.spring.demo.backend.dao.CheckoutRepository;
import com.wade.spring.demo.backend.dao.HistoryRepository;
import com.wade.spring.demo.backend.entity.Book;
import com.wade.spring.demo.backend.entity.Checkout;
import com.wade.spring.demo.backend.service.BookService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BookServiceImpl implements BookService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;
    // private HistoryRepository historyRepository;

    public BookServiceImpl(BookRepository bookRepository, CheckoutRepository checkoutRepository,
            HistoryRepository historyRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
        // this.historyRepository = historyRepository;
    }

    @Override
    public Book checkoutBook(String userEmail, Long bookId) throws Exception {
        Optional<Book> book = bookRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (!book.isPresent() || validateCheckout != null || book.get().getCopiesAvailable() <= 0) {
            throw new Exception("Book doesn't exist or already checked out by user");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId());

        checkoutRepository.save(checkout);

        return book.get();
    }

    @Override
    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }

    @Override
    public Boolean checkoutBookByUser(String userEmail, Long bookId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);
        if (validateCheckout != null) {
            return true;
        } else {
            return false;
        }
    }

}
