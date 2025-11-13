package hospital.controller;

import hospital.database.ShiftRepository;
import hospital.schedule.Shift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable; 

@RestController
@RequestMapping("/api/shifts")

@CrossOrigin(origins = "http://localhost:5174")
public class ShiftController {

    @Autowired
    private ShiftRepository shiftRepository;

    // This gets ALL shifts
    @GetMapping
    public List<Shift> getAllShifts() {
        return shiftRepository.findAll();
    }

    // This creates a new shift
    @PostMapping
    public ResponseEntity<Shift> createShift(@RequestBody Shift shift) {
        try {
            Shift savedShift = shiftRepository.save(shift);
            return new ResponseEntity<>(savedShift, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }


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