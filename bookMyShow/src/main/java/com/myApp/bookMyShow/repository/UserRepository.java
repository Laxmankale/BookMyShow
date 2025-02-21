package com.myApp.bookMyShow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myApp.bookMyShow.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
