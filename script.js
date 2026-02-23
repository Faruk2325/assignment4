
let interviewList = [];
let rejectedList = [];

let totalJob = document.getElementById("totalJob");
let allJob = document.getElementById("AllJob");
let Interview = document.getElementById("Interview");
let Rejected = document.getElementById("Rejected");

let getTotalJob = document.getElementById("jobs");
const mainContainer = document.querySelector("main");
let filteredjob = document.getElementById("filtered-job");

let btnAllJob = document.getElementById("btn-alljob");
let btnInterview = document.getElementById("btn-Interview");
let btnRejected = document.getElementById("btn-Rejected");

function calculateJob() {
  totalJob.innerText = getTotalJob.children.length;
  allJob.innerText = getTotalJob.children.length;
  Interview.innerText = interviewList.length;
  Rejected.innerText = rejectedList.length;
}
calculateJob();

function toggle(id) {
  btnAllJob.classList.remove("bg-blue-800", "text-white");
  btnInterview.classList.remove("bg-blue-800", "text-white");
  btnRejected.classList.remove("bg-blue-800", "text-white");

  btnAllJob.classList.add("bg-gray-300", "text-black");
  btnInterview.classList.add("bg-gray-300", "text-black");
  btnRejected.classList.add("bg-gray-300", "text-black");

  const selected = document.getElementById(id);

  selected.classList.remove("bg-gray-300", "text-black");
  selected.classList.add("bg-blue-800", "text-white");

  if (id === "btn-Interview") {
    renderFiltered(interviewList);
  } else if (id === "btn-Rejected") {
    renderFiltered(rejectedList);
  } else {
    filteredjob.innerHTML = "";
    getTotalJob.classList.remove("hidden");
    filteredjob.classList.add("hidden");
  }
}

mainContainer.addEventListener("click", function (event) {

  const parent = event.target.closest(".job");
  if (!parent) return;

  const companyName = parent.querySelector(".companyName").innerText;
  const positionName = parent.querySelector(".position").innerText;
  const sallary = parent.querySelector(".sallary").innerText;
  const responsibility = parent.querySelector(".responsibility").innerText;

  // INTERVIEW BUTTON
  if (event.target.classList.contains("btn-Interview")) {

    parent.querySelector(".IsApplied").innerText = "Interview";
    parent.querySelector(".IsApplied")
      .classList.add("bg-green-500", "text-white");

    const jobInfo = {
      companyName,
      positionName,
      sallary,
      IsApplied: "Interview",
      responsibility,
    };

    if (!interviewList.find(item => item.companyName === companyName)) {
      interviewList.push(jobInfo);
    }

    // Remove from rejected if exists
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);

    calculateJob();
  }

  // REJECTED BUTTON
  if (event.target.classList.contains("btn-error")) {

    parent.querySelector(".IsApplied").innerText = "Rejected";
    parent.querySelector(".IsApplied")
      .classList.add("bg-red-500", "text-white");

    const jobInfo = {
      companyName,
      positionName,
      sallary,
      IsApplied: "Rejected",
      responsibility,
    };

    if (!rejectedList.find(item => item.companyName === companyName)) {
      rejectedList.push(jobInfo);
    }

    // Remove from interview if exists
    interviewList = interviewList.filter(item => item.companyName !== companyName);

    calculateJob();
  }
});

function renderFiltered(list) {

  getTotalJob.classList.add("hidden");
  filteredjob.classList.remove("hidden");

  filteredjob.innerHTML = "";

  for (let job of list) {

    let div = document.createElement("div");
    div.className =
      "job flex flex-row justify-between border bg-primary-content border-gray-400 rounded-3xl p-6";

    div.innerHTML = `
      <div class="space-y-2">
        <div>
          <p class="companyName text-4xl pb-2 font-bold">${job.companyName}</p>
          <p class="position text-2xl">${job.positionName}</p>
        </div>
        <p class="sallary">${job.sallary}</p>
        <button class="IsApplied btn rounded-2xl font-bold text-white ${
          job.IsApplied === "Interview" ? "bg-green-500" : "bg-red-500"
        }">${job.IsApplied}</button>
        <p class="responsibility">${job.responsibility}</p>
      </div>
    `;

    filteredjob.appendChild(div);
  }
}