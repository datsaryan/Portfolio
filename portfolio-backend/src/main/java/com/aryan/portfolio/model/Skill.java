package com.aryan.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "skills")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    /** e.g. TECHNICAL, TOOL, SOFT */
    @Column(nullable = false)
    private String category;

    /** 0-100, used for the skill bar width; null for tool chips / soft skills */
    private Integer proficiency;

    private Integer displayOrder;
}
