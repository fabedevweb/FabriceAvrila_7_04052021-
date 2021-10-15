//const EmployeeModel = require("../models/employee.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// get all employee list
exports.getEmployeeList = (req, res) => {
  //console.log('here all employees list');
  EmployeeModel.getAllEmployees((err, employees) => {
    console.log("We are here");
    if (err) res.send(err);
    console.log("Employees", employees);
    res.send(employees);
  });
};

// Connex
exports.getEmployeeByID = (req, res) => {
  //console.log('get emp by id');
  EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
    if (err) res.send(err);
    console.log("single employee data", employee);
    res.send(employee);
    console.log(req.params.id);
  });
};

//Inscription d'un employé
exports.createNewEmployee = (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const employeeReqData = new EmployeeModel({
      email: req.body.email,
      password: hash,
    });
    EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Employee Created Successfully",
        data: employee.insertId,
      });
    });
  });
};
// create new employee
/*
exports.createNewEmployee = (req, res) => {
  const employeeReqData = new EmployeeModel(req.body);
  console.log("employeeReqData", employeeReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Employee Created Successfully",
        data: employee.insertId,
      });
    });
  }
};
*/
// update employee
exports.updateEmployee = (req, res) => {
  const employeeReqData = new EmployeeModel(req.body);
  console.log("employeeReqData update", employeeReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    EmployeeModel.updateEmployee(
      req.params.id,
      employeeReqData,
      (err, employee) => {
        if (err) res.send(err);
        res.json({ status: true, message: "Employee updated Successfully" });
      }
    );
  }
};

// delete employee
exports.deleteEmployee = (req, res) => {
  EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Employee deleted successully!" });
  });
};
