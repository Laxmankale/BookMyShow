package com.myApp.bookMyShow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.myApp.bookMyShow.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
	

}
