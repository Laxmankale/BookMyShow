package com.myApp.bookMyShow;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.myApp.bookMyShow.service.MovieService;

@SpringBootTest
class BookMyShowApplicationTests {
	@MockBean
	private MovieService movieService;


	@Test
	void contextLoads() {
	}

}
