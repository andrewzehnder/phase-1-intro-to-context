let arrayOfEmployees = []

function createEmployeeRecord(arrayOfEmployees) {
    let employee = {
        firstName: arrayOfEmployees[0],
        familyName: arrayOfEmployees[1],
        title: arrayOfEmployees[2],
        payPerHour: arrayOfEmployees[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arrayOfArrays) {
    let arrayOfObjects = [];
    for(let array of arrayOfArrays) {
        let employeeRecord = createEmployeeRecord(array);
        arrayOfObjects.push(employeeRecord);
    }
    return arrayOfObjects;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const hour = dateStamp.split(" ")[1];
    const date = dateStamp.split(" ")[0];
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    employeeRecord.timeInEvents.push(timeIn);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const hour = dateStamp.split(" ")[1];
    const date = dateStamp.split(" ")[0];
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOut);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let hoursWorked = 0

    for(let i = 0; i < employeeRecord.timeInEvents.length; i++){
        if (date === employeeRecord.timeInEvents[i].date) {
            let timeInHours = employeeRecord.timeInEvents[i].hour;
            let timeOutHours = employeeRecord.timeOutEvents[i].hour;
            hoursWorked = ((timeOutHours - timeInHours)/100);
        }
    }
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    let pay = employeeRecord.payPerHour
    let wagesEarned = (pay * hoursWorked)
    return wagesEarned
}

function allWagesFor(employeeRecord) {
    let totalEarned = 0
    for(let i = 0; i < employeeRecord.timeInEvents.length; i++){
        let dailyWagesEarned = wagesEarnedOnDate(employeeRecord, employeeRecord.timeInEvents[i].date);
        totalEarned += dailyWagesEarned;
    }
    return totalEarned;
}

function calculatePayroll(arrayOfEmployees) {
        let totalEmployeeWages = 0
    for(let employee of arrayOfEmployees) {
        let EmployeeWages = allWagesFor(employee);
        totalEmployeeWages += EmployeeWages;
    }
    return totalEmployeeWages
}