package hospital.service;

import hospital.database.documents.LeaveRequestDocument;
import hospital.schedule.LeaveRequest;
import hospital.repository.LeaveRepo;

import java.util.List;

public class LeaveService {

    private final LeaveRepo repo;

    public LeaveService(LeaveRepo repo) {
        this.repo = repo;
    }

    public List<LeaveRequestDocument> getAll() {
        return repo.findAll();
    }

    public String create(LeaveRequest r) {
        if (r.getStatus() == null)
            r.setStatus("Pending");

        // return MongoDB id
        return repo.save(r);
    }

    public void approve(String dbId) {
        repo.updateStatus(dbId, "Approved");
    }

    public void reject(String dbId) {
        repo.updateStatus(dbId, "Rejected");
    }
}
