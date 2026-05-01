package com.india_trade_expo.ind_trade_expo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String home() {
        return "India Trade Expo Backend is Running successfully!";
    }
}
