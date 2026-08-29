package com.aryan.portfolio.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String dateRange;

    private String githubUrl;

    private String liveUrl;

    /** Lower number = shown first */
    private Integer displayOrder;

    @ElementCollection
    @CollectionTable(name = "project_tech_tags", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "tag")
    private List<String> techTags = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "project_highlights", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "highlight")
    private List<String> highlights = new ArrayList<>();
}
