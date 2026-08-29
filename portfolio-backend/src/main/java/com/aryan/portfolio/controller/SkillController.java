package com.aryan.portfolio.controller;

import com.aryan.portfolio.model.Skill;
import com.aryan.portfolio.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillRepository skillRepository;

    @GetMapping
    public List<Skill> getAllSkills(@RequestParam(required = false) String category) {
        if (category != null && !category.isBlank()) {
            return skillRepository.findByCategoryOrderByDisplayOrderAsc(category.toUpperCase());
        }
        return skillRepository.findAllByOrderByDisplayOrderAsc();
    }
}
