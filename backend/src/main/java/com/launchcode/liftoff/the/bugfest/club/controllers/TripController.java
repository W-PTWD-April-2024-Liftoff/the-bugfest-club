package com.launchcode.liftoff.the.bugfest.club.controllers;

import com.launchcode.liftoff.the.bugfest.club.models.TravelPlan;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import com.launchcode.liftoff.the.bugfest.club.service.TripService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/trips/")
@Slf4j
public class TripController {

    @Autowired
    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping("/tripPlan")
    public TravelPlan saveAIPlan(@RequestBody TravelPlan plan) {
        if (plan.getTrip() == null) {
            return null;
        }
        return tripService.saveAIPlan(plan);
    }

    @PostMapping
    public Trip createTrip(@RequestBody Trip trip) {
        return tripService.createTrip(trip);
    }


    @GetMapping("/tripPlan")
    public Iterable<TravelPlan> getAllTripPlans() {
        return tripService.getAllTrips();
    }

    @GetMapping("/tripPlan/{id}")
    public Optional<TravelPlan> getTravelPlanById(@PathVariable Long id) {
        return tripService.getTravelPlanById(id);
    }

}