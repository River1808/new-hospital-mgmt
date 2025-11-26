package hospital.repository;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
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

    public List<Employee> findAll() {
        List<Employee> list = new ArrayList<>();
        for (Document doc : col.find()) {
            Employee e = EmployeeMapper.fromDoc(doc);
            if (e != null) list.add(e);
        }
        return list;
    }

    public void save(Employee e) {
        col.insertOne(EmployeeMapper.toDoc(e));
    }

    public void delete(int id) {
        col.deleteOne(Filters.eq("id", id));
    }
}
