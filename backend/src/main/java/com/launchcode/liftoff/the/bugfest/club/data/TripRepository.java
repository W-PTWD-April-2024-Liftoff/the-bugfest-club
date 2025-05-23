package com.launchcode.liftoff.the.bugfest.club.data;

import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends CrudRepository<Trip, Long> {
    List<Trip> findByUserId(Long userId);
}
