package com.launchcode.liftoff.the.bugfest.club;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TheBugfestClubApplication {

    public static void main(String[] args) {

        try {
            SpringApplication.run(TheBugfestClubApplication.class, args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
