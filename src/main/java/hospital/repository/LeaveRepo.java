package hospital.repository;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
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

    public List<LeaveRequest> findAll() {
        List<LeaveRequest> list = new ArrayList<>();
        for (Document doc : col.find()) {
            list.add(LeaveMapper.fromDoc(doc));
        }
        return list;
    }

    public void save(LeaveRequest r) {
        Document doc = LeaveMapper.toDoc(r);
        col.insertOne(doc);
        r.setId(doc.getObjectId("_id").toString());
    }

    public void updateStatus(String id, String status) {
        col.updateOne(
                Filters.eq("_id", new ObjectId(id)),
                new Document("$set", new Document("status", status))
        );
    }
}
