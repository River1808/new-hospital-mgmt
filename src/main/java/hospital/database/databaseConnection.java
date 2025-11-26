//This file is just for testing connection with the Database
package hospital.database;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import io.github.cdimascio.dotenv.Dotenv;

import java.util.ArrayList;
import java.util.List;

public class databaseConnection {
    public static void main(String[] args) {
        System.out.println(">>> [TEST] Starting Database Connection Test...");

        String connectionString = "mongodb://localhost:27017";

        try {
            Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
            String dbHost = dotenv.get("DB_HOST");
            
            if (dbHost != null && !dbHost.isEmpty()) {
                System.out.println(">>> [TEST] Found DB_HOST: " + dbHost);
                if (dbHost.startsWith("mongodb")) {
                    connectionString = dbHost;
                } else {
                    connectionString = "mongodb://" + dbHost + ":27017";
                }
            } else {
                System.out.println(">>> [TEST] No DB_HOST found. Using localhost.");
            }

            System.out.println(">>> [TEST] Final Connection String: " + connectionString);

            try (MongoClient mongoClient = MongoClients.create(connectionString)) {
                
                MongoDatabase database = mongoClient.getDatabase("hospital");
                System.out.println(">>> [TEST] Connected to database: " + database.getName());

                MongoCollection<Document> employees = database.getCollection("employee");
                long count = employees.countDocuments();
                System.out.println(">>> [TEST] Found " + count + " documents in 'employee' collection.");

                List<Document> results = employees.find().limit(5).into(new ArrayList<>());
                for (Document doc : results) {
                    System.out.println("    - " + doc.toJson());
                }

                System.out.println(">>> [TEST] SUCCESS! Database connection is working.");

            } catch (Exception e) {
                System.err.println(">>> [TEST] FAILED to connect to MongoDB.");
                e.printStackTrace();
            }

        } catch (Exception e) {
            System.err.println(">>> [TEST] Error loading .env or setup.");
            e.printStackTrace();
        }
    }
}