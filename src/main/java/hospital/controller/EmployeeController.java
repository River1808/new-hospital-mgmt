package hospital.controller;

import hospital.database.EmployeeRepository;
import hospital.staffClasses.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate; // <-- IMPORT THIS
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping("/api/employees") 
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    // We still keep the repository for later
    @Autowired 
    private EmployeeRepository employeeRepository;

    // ADDED: The MongoTemplate, which is like your test file
    @Autowired
    private MongoTemplate mongoTemplate;

    // MODIFIED: This method is now simpler and will work
    @GetMapping
    public List<Object> getAllEmployees() {
        // This will find the "employee" collection and return all
        // documents as simple objects, bypassing the abstract class error.
        return mongoTemplate.findAll(Object.class, "employee");
    }

    // REMOVED: The @PostMapping method for adding employees is now gone.
    
}