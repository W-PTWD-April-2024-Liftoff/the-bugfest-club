package com.launchcode.liftoff.the.bugfest.club.models;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;

//import org.springframework.data.annotation.Id;
import jakarta.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

//    @OneToMany
//    @JoinColumn(name = "destination_id")
//    private final List<Destination> destinations = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String role = "ROLE_CUSTOMER";
    private String mobile;




//    public String getId() {
//        return id;
//    }
//    public void setId(String id) {
//        this.id = id;
//    }
//    public String get_id() {
//        return id;
//    }
//    public void set_id(String id) {
//        this.id = id;
//    }
//    public String getFullName() {
//        return fullName;
//    }
//    public void setFullName(String fullName) {
//        this.fullName = fullName;
//    }
//    public String getEmail() {
//        return email;
//    }
//    public void setEmail(String email) {
//        this.email = email;
//    }
//    public String getPassword() {
//        return password;
//    }
//    public void setPassword(String password) {
//        this.password = password;
//    }
//    public String getRole() {
//        return role;
//    }
//    public void setRole(String role) {
//        this.role = role;
//    }
//    public String getMobile() {
//        return mobile;
//    }
//    public void setMobile(String mobile) {
//        this.mobile = mobile;
//    }

}
