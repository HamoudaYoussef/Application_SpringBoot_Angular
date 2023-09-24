package com.example.stage.controllers;


import com.example.stage.entities.Question;
import com.example.stage.repositories.QuestionRepository;
import com.example.stage.services.IQuestionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class QuestionController {
    @Autowired
    IQuestionService questionService;
    @Autowired
    QuestionRepository questionRepository;

        @PostMapping("/createQuestion/{sondageId}")
    @ResponseBody
    public Question createQuestion (@PathVariable("sondageId")Long sondageId,@RequestBody Question question){
        return questionService.createQuestion(question,sondageId);
    }
    @GetMapping("/afficherQuestions")
    public List<Question> afficherQuestions(){return questionService.getQuestions();}

    @GetMapping("/last-added-question-id")
    public ResponseEntity<Long> getLastAddedQuestionId() {
        Long lastAddedId = questionService.getLastAddedQuestionId();

        if (lastAddedId != null) {
            return ResponseEntity.ok(lastAddedId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/getSQuestionBySondageById/{sondageId}")
    @ResponseBody
    public List<Question>  getSondageById (@PathVariable("sondageId") Long sondageId){
        return questionService.findQuestionsBySondageId(sondageId);
    }
    @GetMapping("/getSQuestionById/{questionId}")
    @ResponseBody
    public Question  getSQuestionById (@PathVariable("questionId") Long questionId){
        return questionRepository.findById(questionId).get();
    }
    @DeleteMapping("/deleteQuestion/{questionId}")
    @Transactional
    public ResponseEntity<String> deleteQuestion(@PathVariable("questionId") Long questionId) {
        questionService.deleteQuestion(questionId);
        return new ResponseEntity<String>("question with '"+questionId+"' has been sucessfully deleted", HttpStatus.OK);
    }

    @DeleteMapping("/deleteBySondageId/{sondageId}")
    public void deleteQuestionsBySondageId(@PathVariable Long sondageId) {
            questionService.deleteQuestionsBySondage_Id(sondageId);
        }
    @PutMapping("updateQuestion/{questionId}/{nouveauTitre}")
    public void updateQuestionTitre(
            @PathVariable("questionId") Long reponseId,
            @PathVariable("nouveauTitre") String nouveauTitre)
    {         questionService.updateQuestionTitre(reponseId, nouveauTitre);}
}