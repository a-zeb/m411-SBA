let taskArr = [];
// let storedTableData = localStorage.getItem("storedTableData");
const tableBody = document.getElementById("taskTableBody");

// TODO: add data persist
// $(window).bind("beforeunload", function () {
//   localStorage.setItem(JSON.stringify(taskArr));
// });
// if (storedTableData) {
//   taskArr = JSON.parse(storedTableData);
//   populateTable();
// }

function populateTable() {
  taskArr.forEach((rowData) => {
    for (const key in rowData) {
      //TODO: append the row data and create the table body
    }
  });
}

document.getElementById("submitButton").addEventListener("click", submit);

function submit(event) {
  event.preventDefault();
  const newRow = tableBody.insertRow();
  let taskObj = {};

  taskObj.id = assignID();
  taskObj.taskName = document.getElementById("taskNameInput").value;
  taskObj.category = document.getElementById("categoryInput").value;
  taskObj.dealine = document.getElementById("deadlineInput").value;
  taskObj.status = document.getElementById("initialStatusInput").value;
  taskArr.push(taskObj);

  for (const key in taskObj) {
    const newCell = newRow.insertCell();
    newCell.innerText = taskObj[key];
    //TODO: make taskObj.status into a dropdown
  }

  newRow.setAttribute("id", `row-${taskObj.id}`);
  newRow.setAttribute("value", `${taskObj.id}`);

  const updatesCellButtons = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn btn-danger btn-sm");
  deleteButton.setAttribute("value", `${taskObj.id}`);
  deleteButton.innerText = "Delete";
  updatesCellButtons.appendChild(deleteButton);

  tableBody.appendChild(newRow);
  console.log("Task Array: " + JSON.stringify(taskArr));
}

function assignID() {
  if (taskArr.length > 0) {
    return taskArr[taskArr.length - 1].id + 1;
  } else {
    return 0;
  }
}

function updateStatus(updatedData) {
  //TODO find row by key, modify row
  // let updatedRow = taskArr.find((row) => row.id === updatedData.id);
  console.log("update status dropdown changed");
}

function deleteRow(deleteID) {
  //TODO delete row by id
  // let updatedRow = taskArr.filter((row) => row.id !== deleteID);
  console.log("delete button clicked");
}
