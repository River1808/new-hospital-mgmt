package hospital.service;

import hospital.schedule.LeaveRequest;
import hospital.repository.LeaveRepo;

import java.util.List;

public class LeaveService {

    private final LeaveRepo repo;

    public LeaveService(LeaveRepo repo) {
        this.repo = repo;
    }

    public List<LeaveRequest> getAll() {
        return repo.findAll();
    }

    public LeaveRequest create(LeaveRequest r) {
        if (r.getStatus() == null)
            r.setStatus("Pending");

        repo.save(r);
        return r;
    }

    public void approve(String id) {
        repo.updateStatus(id, "Approved");
    }

    public void reject(String id) {
        repo.updateStatus(id, "Rejected");
    }
}
