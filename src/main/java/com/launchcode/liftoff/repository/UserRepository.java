package com.launchcode.liftoff.repository;

import org.springframework.data.annotation.Id;
import com.launchcode.liftoff.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.core.CrudMethods;
import org.springframework.stereotype.Repository;

import in.mahesh.tasks.usermodel.User;

@Repository
public interface UserRepository extends CrudMethodsRepository<User,Integer> {
      

}
