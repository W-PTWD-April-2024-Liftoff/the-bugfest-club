package com.launchcode.liftoff.the.bugfest.club.data;

import org.springframework.data.annotation.Id;
import com.launchcode.liftoff.the.bugfest.club.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.core.CrudMethods;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User,Long> {
    User findByEmail(String email);

}
