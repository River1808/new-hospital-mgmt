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
        Dotenv dotenv = Dotenv.load();

        String connectionString = dotenv.get("DB_HOST");

        try (MongoClient mongoClient = MongoClients.create(connectionString)) {

            MongoDatabase database = mongoClient.getDatabase("hospital");

            MongoCollection<Document> patients = database.getCollection("employee");

            List<Document> results = patients.find().into(new ArrayList<>());

            System.out.println("Found: " + results.size());
            results.forEach(doc -> System.out.println(doc.toJson()));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
