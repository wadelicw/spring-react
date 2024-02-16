package com.wade.spring.demo.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wade.spring.demo.backend.requestmodels.AddBookRequest;
import com.wade.spring.demo.backend.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

  private AdminService adminService;

  public AdminController(AdminService adminService) {
    this.adminService = adminService;
  }

  @PutMapping("/secure/increase/book/quantity")
  public void increaseBookQuantity(@RequestParam Long bookId) throws Exception {
    adminService.increaseBookQuantity(bookId);
  }

  @PutMapping("/secure/decrease/book/quantity")
  public void decreaseBookQuantity(@RequestParam Long bookId) throws Exception {
    adminService.decreaseBookQuantity(bookId);
  }

  @PostMapping("/secure/add/book")
  public void postBook(@RequestBody AddBookRequest addBookRequest) throws Exception {
    adminService.postBook(addBookRequest);
  }

  @DeleteMapping("/secure/delete/book")
  public void deleteBook(@RequestParam Long bookId) throws Exception {
    adminService.deleteBook(bookId);
  }

}