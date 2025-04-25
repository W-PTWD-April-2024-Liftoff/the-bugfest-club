package com.launchcode.liftoff.the.bugfest.club.service;

import com.launchcode.liftoff.the.bugfest.club.data.TravelPlanRepository;
import com.launchcode.liftoff.the.bugfest.club.data.TripRepository;
import com.launchcode.liftoff.the.bugfest.club.models.TravelPlan;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@Service
public class TripService {

    @Autowired
    private final TripRepository tripRepository;

    @Autowired
    private TravelPlanRepository travelPlanRepository;


    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;

    }

    public Trip createTrip(Trip trip) {

        return tripRepository.save(trip);
    }

    public TravelPlan saveAIPlan(TravelPlan plan) {
        Trip trip = plan.getTrip();

        if (trip != null) {
            Trip savedTrip = tripRepository.save(trip);//trip id is saved first

            plan.setTrip(savedTrip);//later attaching tripId to the plan
        }

        return travelPlanRepository.save(plan);
    }
    public Iterable<TravelPlan> getAllTrips(){
        return travelPlanRepository.findAll();
    }


    public Optional<TravelPlan> getTravelPlanById(Long id){

        return travelPlanRepository.findById(id);
    }

}