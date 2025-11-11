package hospital.database;

import hospital.staffClasses.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository // Tells Spring this is a database repository
public interface EmployeeRepository extends MongoRepository<Employee, Integer> {
}