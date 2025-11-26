package hospital.repository;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import hospital.mapper.ShiftMapper;
import hospital.schedule.Shift;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class ShiftRepo {

    private final MongoCollection<Document> col;

    public ShiftRepo(MongoCollection<Document> col) {
        this.col = col;
    }

    public List<Shift> findAll() {
        List<Shift> list = new ArrayList<>();
        for (Document doc : col.find()) {
            list.add(ShiftMapper.fromDoc(doc));
        }
        return list;
    }

    public void save(Shift s) {
        Document doc = ShiftMapper.toDoc(s);
        col.insertOne(doc);
        s.setId(doc.getObjectId("_id").toString());
    }

    public void delete(String id) {
        col.deleteOne(Filters.eq("_id", new ObjectId(id)));
    }
}
