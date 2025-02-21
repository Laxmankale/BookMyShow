package com.myApp.bookMyShow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myApp.bookMyShow.entity.Theater;

@Repository
public interface TheaterRepository extends JpaRepository<Theater, Long>  {

}
