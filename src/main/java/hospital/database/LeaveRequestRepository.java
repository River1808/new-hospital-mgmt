package hospital.database;

import hospital.schedule.LeaveRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeaveRequestRepository extends MongoRepository<LeaveRequest, String> {
    
    // Spring will automatically create a method to find requests by employee ID
    List<LeaveRequest> findByEmployeeId(int employeeId);
    
}