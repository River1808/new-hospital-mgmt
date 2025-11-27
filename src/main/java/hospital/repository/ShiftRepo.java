package hospital.repository;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import hospital.database.documents.ShiftDocument;
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

    // Return list of DB-level documents
    public List<ShiftDocument> findAll() {
        List<ShiftDocument> list = new ArrayList<>();
        for (Document doc : col.find()) {
            list.add(ShiftMapper.toDocumentModel(doc));
        }
        return list;
    }

    // Save domain object → return generated database id
    public String save(Shift s) {
        Document doc = ShiftMapper.toDbDocument(s);
        col.insertOne(doc);
        return doc.getObjectId("_id").toHexString();
    }

    // Delete by MongoDB id
    public void delete(String id) {
        col.deleteOne(Filters.eq("_id", new ObjectId(id)));
    }
}
