package hospital.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import io.github.cdimascio.dotenv.Dotenv;

public class Database {

    private static MongoDatabase db;

    public static MongoDatabase get() {
        if (db != null) return db;

        Dotenv env = Dotenv.configure().ignoreIfMissing().load();
        String uri = env.get("DB_HOST", "mongodb://localhost:27017");

        MongoClient client = MongoClients.create(uri);
        db = client.getDatabase("hospital");

        return db;
    }
}
