package com.myApp.bookMyShow.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.myApp.bookMyShow.entity.Show;
import com.myApp.bookMyShow.repository.ShowRepository;

@Service
public class ShowService {

	@Autowired
	private ShowRepository showRepository;

	// Get all shows
	public List<Show> getAllShows() {
		return showRepository.findAll();
	}

	// Add a new show
	public Show addShow(Show show) {
		return showRepository.save(show);
	}

	// Get a specific show by ID
	public Show getShowById(Long id) {
		Optional<Show> show = showRepository.findById(id);
		return show.orElse(null);
	}
}
