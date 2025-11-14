package hospital.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/api/leaverequests")
@CrossOrigin(origins = "http://localhost:5174") 
public class LeaveRequestController {


    @Autowired
    private MongoTemplate mongoTemplate;
    
    @GetMapping
    public List<Object> getAllLeaveRequests() {
        return mongoTemplate.findAll(Object.class, "leaveRequest");
    }
}