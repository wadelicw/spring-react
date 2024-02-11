package com.wade.spring.demo.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.wade.spring.demo.backend.utils.JwtUtils;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Value("${jwt.secret.token}")
	private String jwtSecret;

	@Bean
	public CommandLineRunner commandLineRunner(JwtUtils jwtUtils) {
		return runner -> {
			test(jwtUtils);
		};
	}

	private void test(JwtUtils jwtUtils) {
		// User user = new User("admin@adin", "123pw", "ADMIN");
		// String result = jwtUtils.generateToken(user);
		// System.out.println("Demo generateToken result : " + result);

		String name = jwtUtils.extractUsername("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbiIsInN1YiI6ImFkbWluQGFkbWluIiwiaWF0IjoxNzA3NjQ1MDk5LCJleHAiOjE3MDc3MzE0OTl9.iWz_MNOjp7GmEkVdt_ohyqC7sRAQzMgG8LCcrjPccDo");
		System.out.println("Demo generateToken result : " + name);
		System.out.println("Is token valid : " + jwtUtils.isTokenExpired("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbiIsInN1YiI6ImFkbWluQGFkbWluIiwiaWF0IjoxNzA3NjQ1MDk5LCJleHAiOjE3MDc3MzE0OTl9.iWz_MNOjp7GmEkVdt_ohyqC7sRAQzMgG8LCcrjPccDo"));
	}

}
