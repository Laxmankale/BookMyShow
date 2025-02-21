package com.myApp.bookMyShow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myApp.bookMyShow.entity.Show;

@Repository
public interface ShowRepository extends JpaRepository<Show, Long> {

}
