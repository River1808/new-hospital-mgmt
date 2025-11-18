package hospital.controller;

import hospital.database.ShiftRepository;
import hospital.schedule.Shift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable; 

import org.springframework.data.domain.Sort;

// --- 1. IMPORT THESE NEW CLASSES ---
import org.springframework.dao.DuplicateKeyException;
// We are removing MongoTemplate and its imports
// import org.springframework.data.mongodb.core.MongoTemplate; 
// import org.springframework.data.mongodb.core.query.Query;
// import org.springframework.data.mongodb.core.query.Criteria; 
// import org.springframework.web.bind.annotation.RequestParam; 

@RestController
@RequestMapping("/api/shifts")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class ShiftController {

    @Autowired
    private ShiftRepository shiftRepository;

    // We are using the correct repository, not the workaround
    @GetMapping
    public List<Shift> getAllShifts() {
        // This finds all shifts and sorts them by employeeId, ascending.
        return shiftRepository.findAll(Sort.by(Sort.Direction.ASC, "employeeId"));
    }

    // --- 2. THIS METHOD IS NOW FIXED ---
    @PostMapping
    public ResponseEntity<?> createShift(@RequestBody Shift shift) {
        try {
            Shift savedShift = shiftRepository.save(shift);
            return new ResponseEntity<>(savedShift, HttpStatus.CREATED);
        
        // --- 3. THIS IS THE NEW "GUARD" ---
        // This catches the "duplicate" error from your database
        } catch (DuplicateKeyException e) {
            return new ResponseEntity<>("Error: This shift (employee, date, time) already exists.", HttpStatus.CONFLICT);
        
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    // --- END OF FIX ---


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