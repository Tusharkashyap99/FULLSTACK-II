package com.example.backend;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackendStatusController {

    @GetMapping("/")
    public Map<String, Object> getStatus() {
        return Map.of(
                "status", "Backend is running",
                "getTasks", "GET /api/tasks",
                "createTask", "POST /api/tasks");
    }
}