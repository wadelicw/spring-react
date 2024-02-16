package com.wade.spring.demo.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wade.spring.demo.backend.entity.Message;
import com.wade.spring.demo.backend.requestmodels.AdminQuestionRequest;
import com.wade.spring.demo.backend.service.MessagesService;

@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    private MessagesService messagesService;

    public MessagesController(MessagesService messagesService) {
        this.messagesService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody Message messageRequest) {
        messagesService.postMessage(messageRequest, userDetails.getUsername());
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AdminQuestionRequest adminQuestionRequest) throws Exception {
        messagesService.putMessage(adminQuestionRequest, userDetails.getUsername());
    }

}