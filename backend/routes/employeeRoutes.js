const express = require("express");
const router = express.Router();
const Employee = require("../Model/Employee");

router.post("/", async (req, res) => {
  try {
    const { employeeId, name, department, salary, experience } = req.body;
    if (!employeeId || !name || !department || !salary || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newEmployee = new Employee({
      employeeId,
      name,
      department,
      salary,
      experience,
    });
    await newEmployee.save();
    res
      .status(201)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding employee", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees", error: error.message });
  }
});

router.get("/search/query", async (req, res) => {
  try {
    const { search, name, department } = req.query;
    const searchValue = (search || "").trim();
    const nameValue = (name || "").trim();
    const departmentValue = (department || "").trim();

    const orConditions = [];
    if (searchValue) {
      orConditions.push(
        { name: { $regex: searchValue, $options: "i" } },
        { department: { $regex: searchValue, $options: "i" } },
      );
    }
    if (nameValue) {
      orConditions.push({ name: { $regex: nameValue, $options: "i" } });
    }
    if (departmentValue) {
      orConditions.push({
        department: { $regex: departmentValue, $options: "i" },
      });
    }

    if (orConditions.length === 0) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const employees = await Employee.find({ $or: orConditions });
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching employees", error: error.message });
  }
});

router.get("/filter/data", async (req, res) => {
  try {
    const { department, minExperience, maxExperience, minSalary, maxSalary } =
      req.query;
    let query = {};
    if (department) {
      query.department = department;
    }
    if (minExperience || maxExperience) {
      query.experience = {};
      if (minExperience) query.experience.$gte = Number(minExperience);
      if (maxExperience) query.experience.$lte = Number(maxExperience);
    }
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }
    const employees = await Employee.find(query);
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error filtering employees", error: error.message });
  }
});

router.get("/insights/data", async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const avgSalaryPerDepartment = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          avgSalary: { $avg: "$salary" },
        },
      },
    ]);
    const highestPaidEmployee = await Employee.findOne().sort({ salary: -1 });
    const departmentWiseCount = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({
      totalEmployees,
      avgSalaryPerDepartment,
      highestPaidEmployee,
      departmentWiseCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching insights", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { employeeId, name, department, salary, experience } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { employeeId, name, department, salary, experience },
      { new: true },
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating employee", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting employee", error: error.message });
  }
});

module.exports = router;
