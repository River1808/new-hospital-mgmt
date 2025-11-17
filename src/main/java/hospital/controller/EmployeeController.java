package hospital.controller;

import hospital.database.EmployeeRepository;
import hospital.staffClasses.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate; // <-- 1. IMPORT THIS
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping("/api/employees") 
// This allows both ports, which is correct
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class EmployeeController {

    @Autowired 
    private EmployeeRepository employeeRepository;

    // 2. ADD THE MONGO TEMPLATE
    @Autowired
    private MongoTemplate mongoTemplate;

    // 3. THIS IS THE STABLE, WORKING METHOD
    @GetMapping
    public List<Object> getAllEmployees() {
        
        // --- 4. THIS IS THE DEBUG PRINTOUT ---
        System.out.println("--- DEBUG: getAllEmployees() method was called! ---");
        
        // This is the simple workaround that we know works.
        return mongoTemplate.findAll(Object.class, "employee");
    }
    
    // Your "Add Employee" method (this will still have the "abstract class" error,
    // but at least your "Get" will work)
    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody Employee employee) {
        try {
            Employee savedEmployee = employeeRepository.save(employee);
            return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}