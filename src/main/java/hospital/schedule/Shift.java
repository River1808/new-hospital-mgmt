package hospital.schedule;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "Shift") 
public class Shift
{
    @Id
    private String id; 

    private int employeeId; 
    
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String role;

    // 3. No-arg constructor (required)
    public Shift() {
    }

    // 4. Constructor (no longer has @Id)
    public Shift(int employeeId, LocalDate date, LocalTime startTime, LocalTime endTime, String role)
    {
        this.employeeId = employeeId; 
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.role = role;
    }

    // --- Getters and Setters ---
    
    // Getter/Setter for the NEW String id
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    // Getter/Setter for your employeeId
    public int getEmployeeId() {
        return employeeId;
    }
    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    // All other getters/setters...
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public LocalTime getStartTime() { return startTime; }
    public void setStartTime(LocalTime startTime) { this.startTime = startTime; }
    public LocalTime getEndTime() { return endTime; }
    public void setEndTime(LocalTime endTime) { this.endTime = endTime; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}