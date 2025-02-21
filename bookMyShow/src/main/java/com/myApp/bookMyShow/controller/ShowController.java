package com.myApp.bookMyShow.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myApp.bookMyShow.entity.Show;
import com.myApp.bookMyShow.service.ShowService;

@RestController
@RequestMapping("/api/shows")
public class ShowController {
	@Autowired
    private ShowService showService;

    // Get all shows
    @GetMapping
    public List<Show> getAllShows() {
        return showService.getAllShows();
    }

    // Add a new show
    @PostMapping
    public Show addShow(@RequestBody Show show) {
        return showService.addShow(show);
    }

    // Get a show by ID
    @GetMapping("/{id}")
    public Show getShowById(@PathVariable Long id) {
        return showService.getShowById(id);
    }
}
