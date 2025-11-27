package hospital.service;

import hospital.schedule.Shift;
import hospital.database.documents.ShiftDocument;
import hospital.repository.ShiftRepo;

import java.util.List;

public class ShiftService {

    private final ShiftRepo repo;

    public ShiftService(ShiftRepo repo) {
        this.repo = repo;
    }

    public List<ShiftDocument> getAll() {
        return repo.findAll();
    }

    public Shift create(Shift s) {
        repo.save(s);
        return s;
    }

    public void delete(String id) {
        repo.delete(id);
    }
}
