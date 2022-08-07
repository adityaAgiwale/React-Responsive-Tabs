import { useEffect, useState } from "react";
import "./styles.css";
import { AiOutlineDoubleRight } from "react-icons/ai";

const URL = "https://course-api.com/react-tabs-project";
export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);

  const fetchData = async () => {
    try {
      const responce = await fetch(URL);
      const itemData = await responce.json();
      setData(itemData);
      setLoading(false);
    } catch (error) {
      console.log(`Error is ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <section style={{ textAlign: "center", fontSize: "25px" }}>
        <h1>Loading...</h1>
      </section>
    );
  }
  const { title, dates, duties, company } = data[value];

  return (
    <div className="App">
      <h1>Experience</h1>
      <div className="underline" />
      <main className="mainClass">
        <div className="buttonsection">
          {data.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className="btn"
              >
                {item.company}
              </button>
            );
          })}
        </div>
        <div className="content">
          <h3>{title}</h3>
          <p className="companyName">{company}</p>
          <p className="dates">{dates}</p>
          {duties.map((item) => {
            return (
              <div className="mainContent">
                <AiOutlineDoubleRight className="bulletPoints" />
                <p className="textItem">{item}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
