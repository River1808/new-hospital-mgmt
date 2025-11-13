package hospital.database;

import hospital.schedule.Shift;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShiftRepository extends MongoRepository<Shift, String> {

    List<Shift> findByDate(LocalDate date);
    
    List<Shift> findByEmployeeId(int employeeId);
}