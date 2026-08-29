package com.aryan.portfolio.controller;

import com.aryan.portfolio.dto.ContactRequest;
import com.aryan.portfolio.model.ContactMessage;
import com.aryan.portfolio.repository.ContactMessageRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> submitMessage(@Valid @RequestBody ContactRequest request) {
        ContactMessage entity = new ContactMessage();
        entity.setName(request.getName());
        entity.setEmail(request.getEmail());
        entity.setSubject(request.getSubject());
        entity.setMessage(request.getMessage());

        ContactMessage saved = contactMessageRepository.save(entity);
        return Map.of(
                "status", "success",
                "message", "Thanks for reaching out! I'll get back to you soon.",
                "id", saved.getId()
        );
    }
}
