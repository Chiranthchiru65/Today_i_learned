const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
  {
    text: "chiru",
  },
];
const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// console.log([8, 20, -23, 5, 24].find((el) => el >= 10));
// console.log(CATEGORIES.find((cat) => cat.name === "technology").color);
//selecting dom elements

const task1 = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const remove = document.querySelector(".fact-tempRemove");

//create dom elements
remove.innerHTML = "";

//Loading data from supa base
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://szmocbabbojkpqzccfki.supabase.co/rest/v1/facts?",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bW9jYmFiYm9qa3BxemNjZmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczMjU5NTgsImV4cCI6MjAwMjkwMTk1OH0.Vlh7XBKz7WNJ-2nmc3XQlFYgWzxaUA8ErrZEXmIWokA",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bW9jYmFiYm9qa3BxemNjZmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczMjU5NTgsImV4cCI6MjAwMjkwMTk1OH0.Vlh7XBKz7WNJ-2nmc3XQlFYgWzxaUA8ErrZEXmIWokA",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  // const filteredData = data.filter((fact) => fact.category === "technology");

  createFactsList(data);
}

// console.log(res);
// createFactsList(initialFacts);
// remove.insertAdjacentHTML("afterbegin", "<li>Chiranth</li>");
// remove.insertAdjacentHTML("afterbegin", "<li>pramukh</li>");
function createFactsList(dataArr) {
  const htmlArr = dataArr.map(
    (fact) => `<li class="fact">${fact.text} <p>
                  ${fact.text}<a
                    class="sources"
                    href="${fact.source}"
                    target="_blank"
                    >(Source)</a
                  >
                </p>
                <span class="tag" style="background-color:${
                  CATEGORIES.find((cat) => cat.name === fact.category)?.color
                }
                  
                "> ${fact.category}</span>
                </li>`
  );

  const html = htmlArr.join("");
  remove.insertAdjacentHTML("afterbegin", html);
}

//Toggle form visibility
task1.addEventListener("click", function () {
  //   console.log("hello again chiranth");
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    // btn.textContent = "close";
    task1.textContent = "close";
  } else {
    form.classList.add("hidden");
    task1.textContent = "Share a fact";
  }
});

//////////////////////////////////////////////////////////////////////////////
// // console.log(initialFacts);

// console.log([8, 20, -23, 5, 24].filter((el) => el >= 10));
// console.log([8, 20, -23, 5, 24].find((el) => el >= 10));
