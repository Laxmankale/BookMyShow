package com.myApp.bookMyShow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myApp.bookMyShow.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

}
