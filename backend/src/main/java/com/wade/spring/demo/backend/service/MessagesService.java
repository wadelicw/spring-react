package com.wade.spring.demo.backend.service;

import com.wade.spring.demo.backend.entity.Message;
import com.wade.spring.demo.backend.requestmodels.AdminQuestionRequest;

public interface MessagesService {
    void postMessage(Message messageRequest, String userEmail);

    void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail) throws Exception;
}
