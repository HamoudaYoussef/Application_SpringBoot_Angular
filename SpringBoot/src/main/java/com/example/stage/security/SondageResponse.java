package com.example.stage.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SondageResponse {
    private Long id;
    private String tokens;
    private String errorMessage;
}
