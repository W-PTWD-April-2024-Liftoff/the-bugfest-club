package com.launchcode.liftoff.the.bugfest.club.service;

import com.launchcode.liftoff.the.bugfest.club.models.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    List<User> getAllUser();

    User findUserProfileByJwt(String jwt);

    User findUserByEmail(String email);

    User findUserById(String userId);

    List<User> findAllUsers();

}
