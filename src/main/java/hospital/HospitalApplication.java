package hospital;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class HospitalApplication {

    public static void main(String[] args) {
        
        // 1. Load the .env file from your project's root folder
        Dotenv dotenv = Dotenv.load();
        String dbHost = dotenv.get("DB_HOST"); // <-- Get the variable

        // 2. DEBUG: This will print your connection string to the console.
        // If it prints "null", your .env file is not in the main
        // 'hospital-schedule-mgmt' folder (the one with pom.xml).
        System.out.println("--- DEBUG ---");
        System.out.println("Loaded DB_HOST from .env: " + dbHost);
        System.out.println("---------------");

        // 3. Create a SpringApplication instance
        SpringApplication app = getSpringApplication(dbHost);

        // 6. Run the application
        app.run(args);
    }

    private static SpringApplication getSpringApplication(String dbHost) {
        SpringApplication app = new SpringApplication(HospitalApplication.class);

        // 4. Create a map of properties to force Spring to use
        // This is where we add all the logic
        Map<String, Object> properties = new HashMap<>();
        properties.put("spring.data.mongodb.uri", dbHost);
        properties.put("spring.data.mongodb.database", "hospital"); // <-- This is the critical line!
        properties.put("spring.jmx.enabled", false); // This removes the JMX warning

        // 5. Set these as the default properties
        app.setDefaultProperties(properties);
        return app;
    }
}