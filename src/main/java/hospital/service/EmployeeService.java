package hospital.service;

import hospital.staffClasses.Employee;
import hospital.repository.EmployeeRepo;

import java.util.Comparator;
import java.util.List;

public class EmployeeService {

    private final EmployeeRepo repo;

    public EmployeeService(EmployeeRepo repo) {
        this.repo = repo;
    }

    public List<Employee> getAll() {
        List<Employee> list = repo.findAll();
        list.sort(Comparator.comparingInt(Employee::getId));
        return list;
    }

    public Employee create(Employee e) {
        repo.save(e);
        return e;
    }

    public void delete(int id) {
        repo.delete(id);
    }
}
