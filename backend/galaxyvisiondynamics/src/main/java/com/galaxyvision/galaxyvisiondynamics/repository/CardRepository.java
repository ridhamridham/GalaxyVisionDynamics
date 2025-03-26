package com.galaxyvision.galaxyvisiondynamics.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.galaxyvision.galaxyvisiondynamics.entity.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByUserId(Long userId);

    List<Card> findByLastFourDigits(String lastFourDigits);
}
