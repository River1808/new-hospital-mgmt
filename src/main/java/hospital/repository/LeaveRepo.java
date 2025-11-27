package hospital.repository;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import hospital.database.documents.LeaveRequestDocument;
import hospital.mapper.LeaveMapper;
import hospital.schedule.LeaveRequest;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class LeaveRepo {

    private final MongoCollection<Document> col;

    public LeaveRepo(MongoCollection<Document> col) {
        this.col = col;
    }

    // Return list of DB-level documents
    public List<LeaveRequestDocument> findAll() {
        List<LeaveRequestDocument> list = new ArrayList<>();
        for (Document doc : col.find()) {
            list.add(LeaveMapper.toDocumentModel(doc));
        }
        return list;
    }

    // Save domain object → return database id
    public String save(LeaveRequest r) {
        Document doc = LeaveMapper.toDbDocument(r);
        col.insertOne(doc);
        return doc.getObjectId("_id").toHexString();
    }

    // Change status using MongoDB id
    public void updateStatus(String id, String status) {
        col.updateOne(
                Filters.eq("_id", new ObjectId(id)),
                new Document("$set", new Document("status", status))
        );
    }
}
