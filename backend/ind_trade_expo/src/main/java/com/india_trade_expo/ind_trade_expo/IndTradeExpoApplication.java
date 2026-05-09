package com.india_trade_expo.ind_trade_expo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class IndTradeExpoApplication {

	public static void main(String[] args) {
		System.out.println("###################################################");
		System.out.println("###   INDIA TRADE EXPO BACKEND IS STARTING...   ###");
		System.out.println("###################################################");
		
		// Confirming environment variables before Spring even starts
		String mongoUrl = System.getenv("MONGODB_URL");
		String mailHost = System.getenv("MAIL_HOST");
		
		System.out.println("Checking Environment:");
		System.out.println("MONGODB_URL present: " + (mongoUrl != null));
		System.out.println("MAIL_HOST present: " + (mailHost != null));
		if (mailHost != null) System.out.println("Active Mail Host: " + mailHost);
		
		SpringApplication.run(IndTradeExpoApplication.class, args);
	}

	@Bean
	public CommandLineRunner startupTest(com.india_trade_expo.ind_trade_expo.service.EmailService emailService) {
		return args -> {
			System.out.println("=========================================");
			System.out.println("--- SYSTEM IS FULLY UP AND RUNNING ---");
			System.out.println("=========================================");
			
			// Trigger a test email in the background so it doesn't slow down the site
			new Thread(() -> {
				try {
					Thread.sleep(5000); // Wait 5 seconds for safety
					System.out.println("--- EXECUTING BACKGROUND MAIL TEST ---");
					emailService.sendSystemHealthEmail();
				} catch (Exception e) {
					System.out.println("BACKGROUND MAIL TEST ERROR: " + e.getMessage());
				}
			}).start();
		};
	}
}
