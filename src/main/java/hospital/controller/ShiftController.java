package hospital.controller;

import hospital.database.ShiftRepository;
import hospital.schedule.Shift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/shifts")
@CrossOrigin(origins = "http://localhost:3000")
public class ShiftController {

    @Autowired
    private ShiftRepository shiftRepository;


    @PostMapping
    public ResponseEntity<Shift> addShift(@RequestBody Shift shift) {
        Shift savedShift = shiftRepository.save(shift);
        return new ResponseEntity<>(savedShift, HttpStatus.CREATED);
    }

    // Replaces: removeShift(int shiftId)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeShift(@PathVariable String id) {
        shiftRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Replaces: getDaySchedule(LocalDate date)
    @GetMapping
    public List<Shift> getShiftsByDate(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        // This uses the 'findByDate' method we defined in the repository
        return shiftRepository.findByDate(date);
    }


    @GetMapping("/employee/{employeeId}")
    public List<Shift> getShiftsByEmployee(@PathVariable int employeeId) {
        // This uses the 'findByEmployeeId' method we defined
        return shiftRepository.findByEmployeeId(employeeId);
    }
}