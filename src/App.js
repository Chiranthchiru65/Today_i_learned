import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFact() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } = await query.order("votesIntresting", {
          ascending: false,
        });

        console.log(error);
        setFacts(facts);
        setIsLoading(false);
      }
      getFact();
    },
    [currentCategory]
  );

  return (
    <>
      {/* HEADER  */}

      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}
      <main className="main">
        <CategoryFilters setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const DocName = "Today I Learned!";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="img" height="65" width="65  " />
        <h1>{DocName}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "close" : "Share a fact!"}
      </button>
    </header>
  );
}

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

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const textLength = text.length;
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e) {
    // 1. prevent browser reload
    e.preventDefault();
    // console.log(text, source, category);
    // 2. check if data is valid . If so ,create a new fact.

    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // console.log("there is data here");

      // 3. create a new fact object
      // const newFact = {
      //   id: Math.floor(Math.random() * 1000000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. upload fact to supabase and receive the new fact new object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);
      console.log(newFact);

      // 4. add the new fact to the UI : add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      // 5. reset the input fields
      setText("");
      setSource("");
      setCategory("");

      // 6. close the form functionality
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy resources..."
        value={source}
        onChange={(a) => setSource(a.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        disabled={isUploading}
        onChange={(z) => setCategory(z.target.value)}
      >
        <option value="">choose category:</option>
        {CATEGORIES.map((cat) => (
          <option value={cat.name}>{cat.name.toUpperCase()}</option>
        ))}
      </select>
      <button disabled={isUploading} className="btn btn-large">
        Post
      </button>
    </form>
  );
}

function CategoryFilters({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories "
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((rotate) => (
          <li key={rotate.name} className="category">
            <button
              className="btn btn-category"
              onClick={() => setCurrentCategory(rotate.name)}
              style={{ backgroundColor: rotate.color }}
            >
              {rotate.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  //TEMPORARY

  if (facts.length === 0)
    return (
      <p className="message">
        {" "}
        No facts for this category yet! Create the first one :)
      </p>
    );

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  async function handleVote() {
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ votesIntresting: fact.votesIntresting + 1 })
      .eq("id", fact.id)
      .select();
    console.log(updatedFact);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === facts.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {fact.text}
        <a className="sources" href={fact.source} target="blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            ?.color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button onClick={handleVote}>
          👍<strong>{fact.votesIntresting}</strong>
        </button>
        <button>
          🤯<strong>{fact.votesMindblowing}</strong>
        </button>
        <button>
          ⛔️<strong>{fact.votesFalse}</strong>
        </button>
      </div>
    </li>
  );
}

export default App;
