// ---------- PART 1: PROMISES ----------
function getNewPromise(value, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
}

// What does it do?
// → Returns a Promise that resolves with the given value after the specified delay.

// Example 1: Display resolved value
getNewPromise("Hello from Promise!", 1500)
  .then(value => {
    document.getElementById("promise1").textContent = value;
  });

// Example 2: Chain of .then()
getNewPromise("javascript", 2000)
  .then(str => str.toUpperCase())
  .then(str => str.split("").reverse().join(""))
  .then(result => {
    document.getElementById("promise2").textContent = result;
  });

// Example 3: Console test
getNewPromise(42, 3000)
  .then(result => result * 2)
  .then(result => {
    getNewPromise(result + 16, 1000)
      .then(result => console.log("Nested result:", result))
      .catch(e => {});
    return result;
  })
  .then(result => {
    // Uncomment this line to test error handling:
    // throw new Error("Manual error for testing");
    console.log("Final result:", result * -1);
  })
  .catch(e => console.error("Failed:", e.message));

// ---------- PART 2: REGULAR EXPRESSIONS ----------
// To test these in VS Code (Ctrl + F + enable .* for regex search):

// 1️⃣ Any open tag without attributes:        <[a-zA-Z]+>
// 2️⃣ Any close tag without spaces:            </[a-zA-Z]+>
// 3️⃣ Any tag (open or close, any contents):   </?.+?>
// 4️⃣ Valid JS variable name:                  [a-zA-Z_$][a-zA-Z0-9_$]*

// ---------- PART 3: FUNCTIONAL PROGRAMMING ----------
const STUDENT_DATA_JSON = '[' +
'{"name": "Annie Apple","id": "X00111111","address": "Phibsboro, D7","grades": [60, 71, 55, 53, 44, 62]},' +
'{"name": "Ben Bounce","id": "B00111111","address": "Rathmines, D6","grades": [44, 22, 77, 33, 41, 50]},' +
'{"name": "Charlie Curry","id": "B00222222","address": "Phibsboro, D7","grades": [80, 88, 75, 81, 90, 77]},' +
'{"name": "Dan Dreamer","id": "X00222222","address": "Cabra, D7","grades": [64, 55, 66, 65, 78, 62]},' +
'{"name": "Emmy Ember","id": "X00333333","address": "Stoneybatter, D7","grades": [53, 55, 55, 52, 51, 60]},' +
'{"name": "Fiona Falls","id": "C00111111","address": "Grangegorman, D7","grades": [90, 91, 88, 80, 81, 97]},' +
'{"name": "Georgina Gull","id": "C00222222","address": "City Centre, D1","grades": [76, 67, 63, 71, 55, 82]},' +
'{"name": "Harry Hops","id": "C00333333","address": "Cabra, D7","grades": [50, 33, 55, 11, 42, 61]},' +
'{"name": "Iris Indie","id": "X00444444","address": "Tallaght, D24","grades": [61, 71, 58, 70, 65, 67]},' +
'{"name": "Jack Jobs","id": "C00444444","address": "Phibsboro, D7","grades": [60, 71, 55, 53, 44, 62]},' +
'{"name": "Kat Kid","id": "C00555555","address": "Grangegorman, D7","grades": [41, 41, 50, 48, 55, 44]},' +
'{"name": "Lula Lock","id": "C00666666","address": "Cabra, D7","grades": [77, 80, 85, 80, 78, 81]}' +
']';

const students = JSON.parse(STUDENT_DATA_JSON);

// Display list of IDs
const ids = students.map(s => s.id).join(", ");
document.getElementById("student-ids").textContent = ids;

// Transform student data
const processed = students.map(s => {
  const [firstName, lastName] = s.name.split(" ");
  const [town, postcode] = s.address.split(", ");
  const avg = s.grades.reduce((a, b) => a + b, 0) / s.grades.length;
  return {
    id: s.id,
    name: firstName,
    surname: lastName,
    town,
    postcode: postcode.replace("D", ""),
    average: avg
  };
});

// Find top performer
const topAverage = Math.max(...processed.map(s => s.average));

// Add result category
const withResult = processed.map(s => ({
  ...s,
  result: s.average >= 40 ? (s.average === topAverage ? "A" : "P") : "F"
}));

// Helper: create table
function buildTable(elementId, data, columns) {
  const table = document.getElementById(elementId);
  table.innerHTML = "";

  const header = document.createElement("tr");
  columns.forEach(c => {
    const th = document.createElement("th");
    th.textContent = c.toUpperCase();
    header.appendChild(th);
  });
  table.appendChild(header);

  data.forEach(d => {
    const row = document.createElement("tr");
    columns.forEach(c => {
      const td = document.createElement("td");
      td.textContent = d[c];
      row.appendChild(td);
    });
    table.appendChild(row);
  });
}

// Display all students
buildTable("students-table", withResult, ["id", "name", "surname", "town", "postcode", "average", "result"]);

// Any failed?
const anyFailed = withResult.some(s => s.result === "F");
document.getElementById("has-failed").textContent = "Any students failed? " + anyFailed;

// Failed students only
const failed = withResult.filter(s => s.result === "F");
buildTable("failed-table", failed, ["id", "name", "surname", "average", "result"]);

// Class average
const classAverage = withResult.reduce((sum, s) => sum + s.average, 0) / withResult.length;
document.getElementById("class-average").textContent = "Class average: " + classAverage.toFixed(2) + "%";
