let taskArr = [];
let storedTableData = localStorage.getItem("storedTableData");
const tableBody = document.getElementById("taskTableBody");
document
  .getElementById("resetTaskData")
  .addEventListener("click", resetTaskData);

if (storedTableData) {
  taskArr = JSON.parse(storedTableData);
  taskArr.forEach((taskObj) => {
    const newRow = tableBody.insertRow();
    for (const key in taskObj) {
      if (key == "status") {
        const newUpdateStatusCell = newRow.insertCell();

        const updateStatusDropdown = document.createElement("select");
        updateStatusDropdown.setAttribute("id", `status-${taskObj.id}`);
        updateStatusDropdown.setAttribute("class", "form-select");
        updateStatusDropdown.addEventListener("change", updateStatus);

        const inProgressOption = document.createElement("option");
        inProgressOption.value = "In Progress";
        inProgressOption.innerText = "In Progress";

        const completedOption = document.createElement("option");
        completedOption.value = "Completed";
        completedOption.innerText = "Completed";

        updateStatusDropdown.value = taskObj[key];

        taskObj[key] == "In Progress"
          ? (inProgressOption.selected = true)
          : (completedOption.selected = true);

        updateStatusDropdown.appendChild(inProgressOption);
        updateStatusDropdown.appendChild(completedOption);
        newUpdateStatusCell.appendChild(updateStatusDropdown);
      } else {
        const newCell = newRow.insertCell();
        newCell.innerText = taskObj[key];
      }
    }
    newRow.setAttribute("id", `row-${taskObj.id}`);
    newRow.setAttribute("value", `${taskObj.id}`);

    const deleteButtonCell = newRow.insertCell();
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn btn-danger btn-sm");
    deleteButton.setAttribute("value", `${taskObj.id}`);
    deleteButton.addEventListener("click", deleteRow);
    deleteButton.innerText = "Delete";
    deleteButtonCell.appendChild(deleteButton);

    tableBody.appendChild(newRow);
  });
}

document.getElementById("submitButton").addEventListener("click", submit);

function submit(event) {
  const newRow = tableBody.insertRow();
  let taskObj = {};

  taskObj.id = assignID();
  taskObj.taskName = document.getElementById("taskNameInput").value;
  taskObj.category = document.getElementById("categoryInput").value;
  taskObj.dealine = document.getElementById("deadlineInput").value;
  taskObj.status = document.getElementById("initialStatusInput").value;
  taskArr.push(taskObj);

  for (const key in taskObj) {
    if (key == "status") {
      const newUpdateStatusCell = newRow.insertCell();

      const updateStatusDropdown = document.createElement("select");
      updateStatusDropdown.setAttribute("id", `status-${taskObj.id}`);
      updateStatusDropdown.setAttribute("class", "form-select");
      updateStatusDropdown.addEventListener("change", updateStatus);

      const inProgressOption = document.createElement("option");
      inProgressOption.value = "In Progress";
      inProgressOption.innerText = "In Progress";

      const completedOption = document.createElement("option");
      completedOption.value = "Completed";
      completedOption.innerText = "Completed";

      updateStatusDropdown.value = taskObj[key];

      taskObj[key] == "In Progress"
        ? (inProgressOption.selected = true)
        : (completedOption.selected = true);

      updateStatusDropdown.appendChild(inProgressOption);
      updateStatusDropdown.appendChild(completedOption);
      newUpdateStatusCell.appendChild(updateStatusDropdown);
    } else {
      const newCell = newRow.insertCell();
      newCell.innerText = taskObj[key];
    }
  }

  newRow.setAttribute("id", `row-${taskObj.id}`);
  newRow.setAttribute("value", `${taskObj.id}`);

  const deleteButtonCell = newRow.insertCell();
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn btn-danger btn-sm");
  deleteButton.setAttribute("value", `${taskObj.id}`);
  deleteButton.addEventListener("click", deleteRow);
  deleteButton.innerText = "Delete";
  deleteButtonCell.appendChild(deleteButton);

  tableBody.appendChild(newRow);
  localStorage.setItem("storedTableData", JSON.stringify(taskArr));
}

function assignID() {
  if (taskArr.length > 0) {
    return taskArr[taskArr.length - 1].id + 1;
  } else {
    return 0;
  }
}

function updateStatus(updateEvent) {
  let updatedStatusValue = updateEvent.target.value;
  let updatedRowId = Number(updateEvent.target.id.slice(7));
  let indexOfTaskArrUpdate = taskArr.findIndex(
    (row) => row.id === updatedRowId
  );
  taskArr[indexOfTaskArrUpdate].status = updatedStatusValue;
  localStorage.setItem("storedTableData", JSON.stringify(taskArr));
}

function deleteRow(deleteEvent) {
  let deleteID = Number(deleteEvent.target.value);
  let filteredRowEl = taskArr.filter((rowObj) => rowObj.id !== deleteID);
  taskArr = filteredRowEl;
  domRowToDelete = document.getElementById(`row-${deleteEvent.target.value}`);
  domRowToDelete.remove();
  localStorage.setItem("storedTableData", JSON.stringify(taskArr));
}

function resetTaskData() {
  localStorage.clear();
  window.location.reload();
}
