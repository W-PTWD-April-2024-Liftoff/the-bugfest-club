package com.launchcode.liftoff.repository;

import org.springframework.data.annotation.Id;
import com.launchcode.liftoff.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.core.CrudMethods;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {
    User findByEmail(String email);

}
