package com.mini.project.Ems.service.impl;

import com.mini.project.Ems.dto.EmployeeDto;
import com.mini.project.Ems.entity.Employee;
import com.mini.project.Ems.exception.ResourceNotFoundException;
import com.mini.project.Ems.mapper.EmployeeMapper;
import com.mini.project.Ems.repository.EmployeeRepository;
import com.mini.project.Ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl  implements EmployeeService {

    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee=employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
      Employee employee=  employeeRepository.findById(employeeId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Employee is not exist with given id :"+employeeId));
              return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
       List<Employee> employees= employeeRepository.findAll();
        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee)).collect(Collectors.toList());
    }



    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
       Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(
                        ()-> new ResourceNotFoundException("Employee is not exist with given id: "+employeeId)
                );
       employee.setFirstName(updatedEmployee.getFirstName());
       employee.setLastName(updatedEmployee.getLastName());
       employee.setEmail(updatedEmployee.getEmail());

     Employee updatedEmployeeObj=  employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(
                        ()-> new ResourceNotFoundException("Employee is not exist with given id: "+employeeId)
                );
        employeeRepository.deleteById(employeeId);
    }
}
