package hospital.controller;

import hospital.database.ShiftRepository;
import hospital.schedule.Shift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate; 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable; 

// --- 1. IMPORT THESE CLASSES ---
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria; // <-- IMPORT THIS
import org.springframework.web.bind.annotation.RequestParam; // <-- AND IMPORT THIS
// --- END OF IMPORTS ---

@RestController
@RequestMapping("/api/shifts")
@CrossOrigin(origins = "http://localhost:5174") // Make sure this port is correct!
public class ShiftController {

    @Autowired
    private ShiftRepository shiftRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    // --- 2. THIS METHOD IS NOW FIXED ---
    @GetMapping
    public List<Object> getAllShifts(
        // This @RequestParam is optional.
        // It looks for a URL parameter like "?role=Nurse"
        @RequestParam(required = false) String role
    ) {
        
        // 1. Create a new query
        Query query = new Query();

        // 2. ADD THE NEW FILTER:
        // If a role is provided in the URL, add it to the query
        if (role != null && !role.isEmpty()) {
            query.addCriteria(Criteria.where("role").is(role));
        }

        // 3. Add the sorting (this still works)
        query.with(Sort.by(Sort.Direction.ASC, "employeeId"));

        // 4. Run the final query
        return mongoTemplate.find(query, Object.class, "shift");
    }
    // --- END OF FIX ---


    // Your "create" method (no changes)
    @PostMapping
    public ResponseEntity<Shift> createShift(@RequestBody Shift shift) {
        try {
            Shift savedShift = shiftRepository.save(shift);
            return new ResponseEntity<>(savedShift, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Your "delete" method (no changes)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShift(@PathVariable String id) {
        try {
            shiftRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}