package hospital.controller;

import hospital.database.EmployeeRepository;
import hospital.staffClasses.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate; 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// --- 1. IMPORT THESE TWO NEW CLASSES ---
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Query;
// --- END OF IMPORTS ---

@RestController 
@RequestMapping("/api/employees") 
// This allows both ports, which is correct
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class EmployeeController {

    @Autowired 
    private EmployeeRepository employeeRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    // --- 2. THIS METHOD IS NOW FIXED ---
    @GetMapping
    public List<Object> getAllEmployees() {
        
        System.out.println("--- DEBUG: getAllEmployees() method was called! ---");
        
        // 1. Create a new query
        Query query = new Query();

        // 2. Tell the query to sort by your "id" field, Ascending
        query.with(Sort.by(Sort.Direction.ASC, "id"));

        // 3. Run the query
        // This will now return your employees, sorted by their 'id'.
        return mongoTemplate.find(query, Object.class, "employee");
    }
    // --- END OF FIX ---
    
    
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