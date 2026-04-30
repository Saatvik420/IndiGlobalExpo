package com.india_trade_expo.ind_trade_expo.controller;

import com.india_trade_expo.ind_trade_expo.model.Exhibitor;
import com.india_trade_expo.ind_trade_expo.service.ExhibitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/exhibitors")
public class ExhibitorController {
    @Autowired
    ExhibitorService exhibitorService;

    @PostMapping("/apply")
    public ResponseEntity<Exhibitor> applyAsExhibitor(@RequestBody Exhibitor request) {
        return ResponseEntity.ok(exhibitorService.applyAsExhibitor(
                request.getCompanyName(),
                request.getSector(),
                request.getWebsite()
        ));
    }

    @GetMapping("/my-application")
    public ResponseEntity<Exhibitor> getMyApplication() {
        Exhibitor application = exhibitorService.getMyApplication();
        if (application == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(application);
    }
}
