package com.mini.project.Ems.service;

import com.mini.project.Ems.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

    List<EmployeeDto>getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId,EmployeeDto employeeDto);

    void deleteEmployee(Long employeeId);
}
