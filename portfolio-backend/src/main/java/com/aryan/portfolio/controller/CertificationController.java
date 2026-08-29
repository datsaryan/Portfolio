package com.aryan.portfolio.controller;

import com.aryan.portfolio.model.Certification;
import com.aryan.portfolio.repository.CertificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@RequiredArgsConstructor
public class CertificationController {

    private final CertificationRepository certificationRepository;

    @GetMapping
    public List<Certification> getAllCertifications() {
        return certificationRepository.findAllByOrderByDisplayOrderAsc();
    }
}
