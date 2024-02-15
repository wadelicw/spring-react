package com.wade.spring.demo.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wade.spring.demo.backend.requestmodels.ReviewRequest;
import com.wade.spring.demo.backend.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookByUser(@AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long bookId) throws Exception {
        return reviewService.userReviewListed(userDetails.getUsername(), bookId);
    }

    @PostMapping("/secure")
    public void postReview(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody ReviewRequest reviewRequest) throws Exception {
        reviewService.postReview(userDetails.getUsername(), reviewRequest);
    }
}