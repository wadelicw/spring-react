package com.wade.spring.demo.backend.service;

import com.wade.spring.demo.backend.requestmodels.ReviewRequest;

public interface ReviewService {
    void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception;

    Boolean userReviewListed(String userEmail, Long bookId);
}
