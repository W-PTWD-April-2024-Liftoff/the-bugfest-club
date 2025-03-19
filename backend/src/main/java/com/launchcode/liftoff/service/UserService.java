package com.launchcode.liftoff.service;

import com.launchcode.liftoff.User;
import java.util.List;

public class UserService {
    
    public List<User> getAllUser();
     
     public User findUserProfileByJwt(String jwt);
     
     public User findUserByEmail(String email);
     
     public User findUserById(String userId);

     public List<User> findAllUsers();

}
