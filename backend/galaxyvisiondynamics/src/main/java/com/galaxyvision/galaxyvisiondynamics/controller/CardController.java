package com.galaxyvision.galaxyvisiondynamics.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.galaxyvision.galaxyvisiondynamics.entity.Card;
import com.galaxyvision.galaxyvisiondynamics.model.CardRequestDto;
import com.galaxyvision.galaxyvisiondynamics.service.CardService;

@RestController
@RequestMapping("/galaxyvision/users/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    @PostMapping("/add")
    public ResponseEntity<Card> addCard(@RequestBody CardRequestDto cardRequestDto) {
        Card savedCard = cardService.addCard(cardRequestDto);
        return ResponseEntity.ok(savedCard);
    }

    @GetMapping
    public ResponseEntity<List<Card>> getCards(@RequestParam Long userId) {
        List<Card> cards = cardService.getCardsByUserId(userId);
        return ResponseEntity.ok(cards);
    }
}
