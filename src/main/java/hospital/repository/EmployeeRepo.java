package hospital.repository;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import hospital.database.documents.EmployeeDocument;
import hospital.mapper.EmployeeMapper;
import hospital.staffClasses.Employee;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class EmployeeRepo {

    private final MongoCollection<Document> col;

    public EmployeeRepo(MongoCollection<Document> col) {
        this.col = col;
    }
    private EmployeeDocument toEmployeeDocument(Document doc) {
        EmployeeDocument d = new EmployeeDocument();
        d.setDatabaseId(doc.getObjectId("_id").toString());
        d.setId(doc.getInteger("id"));
        d.setName(doc.getString("name"));
        d.setDepartment(doc.getString("department"));
        d.setRole(doc.getString("role"));
        return d;
    }

    private Document toMongoDocument(EmployeeDocument d) {
        return new Document()
                .append("id", d.getId())
                .append("name", d.getName())
                .append("department", d.getDepartment())
                .append("role", d.getRole());
    }

    public List<Employee> findAll() {
        List<Employee> list = new ArrayList<>();

        for (Document doc : col.find()) {

            EmployeeDocument empDoc = toEmployeeDocument(doc);
            Employee emp = EmployeeMapper.toDomain(empDoc);

            list.add(emp);
        }
        return list;
    }

    public void save(Employee e) {
        EmployeeDocument doc = EmployeeMapper.toDocument(e);

        col.insertOne(toMongoDocument(doc));
    }

    public void delete(int id) {
        col.deleteOne(Filters.eq("id", id));
    }
}
