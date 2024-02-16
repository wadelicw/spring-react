package com.wade.spring.demo.backend.service.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wade.spring.demo.backend.dao.MessageRepository;
import com.wade.spring.demo.backend.entity.Message;
import com.wade.spring.demo.backend.requestmodels.AdminQuestionRequest;
import com.wade.spring.demo.backend.service.MessagesService;

@Service
@Transactional
public class MessagesServiceImpl implements MessagesService {

    private MessageRepository messageRepository;

    public MessagesServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Override
    public void postMessage(Message messageRequest, String userEmail) {
        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }

    @Override
    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail) throws Exception {
        Optional<Message> message = messageRepository.findById(adminQuestionRequest.getId());
        if (!message.isPresent()) {
            throw new Exception("Message not found");
        }

        message.get().setAdminEmail(userEmail);
        message.get().setResponse(adminQuestionRequest.getResponse());
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }

}
