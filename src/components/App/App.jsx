import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import data from "../../data/data";
import Article from "../Article/Article";

function App() {
  const [theme, setTheme] = useState("");

  const handleToggle = () => {
    if (theme === "light-theme") setTheme("dark-theme");
    else setTheme("light-theme");
  };
  useEffect(() => {
    // Check local storage for a saved theme
    const savedTheme = localStorage.getItem("theme");
    console.log(savedTheme);
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no theme is saved, use the user's operating system setting
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("dark-theme");
      } else {
        setTheme("light-theme");
      }
    }
  }, []);

  useEffect(() => {
    // Save the current theme to local storage
    localStorage.setItem("theme", theme);

    // Set the theme class on the root element
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <main>
      <nav>
        <div className='nav-center'>
          <h1>overreacted</h1>
          <button className='btn' onClick={handleToggle}>
            {theme === "light-theme" ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>
      <section className='articles'>
        {data.map((item) => {
          return <Article key={item.id} {...item} />;
        })}
      </section>
    </main>
  );
}

export default App;
