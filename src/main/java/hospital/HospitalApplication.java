package hospital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv; 

@SpringBootApplication
public class HospitalApplication {

    public static void main(String[] args) {
        

        Dotenv dotenv = Dotenv.load();
        System.setProperty("DB_HOST", dotenv.get("DB_HOST"));

        SpringApplication.run(HospitalApplication.class, args);
    }
}
