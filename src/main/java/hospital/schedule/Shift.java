package hospital.schedule;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;

@Document(collection = "shifts") 
public class Shift
{
    @Id
    private String id; 

    private int employeeId; 
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
    private String role;

    // ADDED: No-argument constructor (required by Spring)
    public Shift() {
    }

    // Constructor
    public Shift(int employeeId, LocalDate date, LocalTime startTime, LocalTime endTime, String role)
    {
        this.employeeId = employeeId;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.role = role;
    }

    // --- Getters and Setters ---

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getEmployeeId()
    {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public LocalDate getDate()
    {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getStartTime()
    {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime()
    {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getRole()
    {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}