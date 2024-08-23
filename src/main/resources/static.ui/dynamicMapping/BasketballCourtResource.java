package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.BasketballCourt;
import com.mycompany.myapp.repository.BasketballCourtRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BasketballCourtResource {

    private final BasketballCourtRepository basketballCourtRepository;

    public BasketballCourtResource(BasketballCourtRepository basketballCourtRepository) {
        this.basketballCourtRepository = basketballCourtRepository;
    }

    @GetMapping("/basketball-courts")
    public List<BasketballCourt> getAllBasketballCourts() {
        return basketballCourtRepository.findAll();
    }
}
