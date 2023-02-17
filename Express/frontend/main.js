import "./style.sass";

const getDataBtn = document.querySelector("#get-data-btn");
const sendDataBtn = document.querySelector("#send-data-btn");

getDataBtn.addEventListener("click", async (e) => {
  const preContainer = e.target.closest(".get-container").querySelector("pre");
  try {
    const response = await fetch("/api");
    const data = await response.json();
    preContainer.innerHTML = JSON.stringify(data);
  } catch (err) {
    console.log(err.message);
    alert("There was an error");
    preContainer.innerHTML = err.message;
  }
});

sendDataBtn.addEventListener("click", async (e) => {
  let body;
  const preContainer = e.target.closest(".post-container").querySelector("pre");
  const inputContainer = e.target
    .closest(".post-container")
    .querySelector("textarea");
  try {
    body = JSON.parse(inputContainer.value.trim());
  } catch (err) {
    console.log(err.message);
    return alert("It is not a valid JSON");
  }
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    preContainer.innerHTML = JSON.stringify(data);
  } catch (err) {
    alert("There was an error");
    preContainer.innerHTML = err.message;
  }
});
