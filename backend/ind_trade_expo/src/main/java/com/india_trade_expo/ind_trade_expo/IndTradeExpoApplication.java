package com.india_trade_expo.ind_trade_expo;

import com.india_trade_expo.ind_trade_expo.model.Sector;
import com.india_trade_expo.ind_trade_expo.model.User;
import com.india_trade_expo.ind_trade_expo.repository.SectorRepository;
import com.india_trade_expo.ind_trade_expo.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class IndTradeExpoApplication {

	private static final Logger logger = LoggerFactory.getLogger(IndTradeExpoApplication.class);

	static {
		try {
			Dotenv dotenv = Dotenv.configure()
					.ignoreIfMissing()
					.load();
			dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
			logger.info(".env variables loaded successfully");
		} catch (Exception e) {
			logger.warn("Could not load .env file: " + e.getMessage());
		}
	}

	@Value("${spring.data.mongodb.uri}")
	private String mongoUri;

	@Autowired
	private SectorRepository sectorRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(IndTradeExpoApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner() {
		return args -> {
			logger.info("====================================================");
			logger.info("MONGODB CONNECTED TO: " + mongoUri);
			logger.info("====================================================");

			// Initialize sectors if empty
			if (sectorRepository.count() == 0) {
				Sector[] initialSectors = {
					new Sector(null, "Healthcare & Medical Devices", "first-aid-kit", "Advanced medical equipment and healthcare solutions."),
					new Sector(null, "Food & Beverages", "coffee", "India's rich flavors and processed food industry."),
					new Sector(null, "Garments & Textiles", "t-shirt", "Exquisite textiles and modern garment manufacturing."),
					new Sector(null, "Gems & Jewelry", "sketch-logo", "World-class craftsmanship in precious gems and jewelry."),
					new Sector(null, "IT & Software Solutions", "cpu", "Cutting-edge IT services and innovative software solutions."),
					new Sector(null, "Manufacturing & Engineering", "gear", "Precision engineering and robust manufacturing capabilities."),
					new Sector(null, "Consumer Goods & FMCG", "shopping-cart", "Daily use high-quality consumer products."),
					new Sector(null, "Handicrafts & Lifestyle", "paint-brush", "Traditional Indian art and modern lifestyle products.")
				};
				sectorRepository.saveAll(Arrays.asList(initialSectors));
				logger.info("Initialized " + initialSectors.length + " sectors.");
			}

			// Initialize default admin user if empty
			if (userRepository.findByEmail("admin@tradeexpo.com").isEmpty()) {
				Set<String> roles = new HashSet<>();
				roles.add("ROLE_USER");
				roles.add("ROLE_ADMIN");

				User admin = User.builder()
						.firstName("Admin")
						.lastName("User")
						.email("admin@tradeexpo.com")
						.password(passwordEncoder.encode("admin123"))
						.roles(roles)
						.build();

				userRepository.save(admin);
				logger.info("Initialized default admin user: admin@tradeexpo.com / admin123");
			}
		};
	}

}
