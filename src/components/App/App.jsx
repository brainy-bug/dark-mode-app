import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import data from "../../data/data";
import Article from "../Article/Article";

function App() {
  const getStorageItem = () => {
    let theme;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      theme = savedTheme;
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        theme = "dark-theme";
      } else {
        theme = "light-theme";
      }
    }
    return theme;
  };

  const [theme, setTheme] = useState(getStorageItem());

  const handleToggle = () => {
    if (theme === "light-theme") setTheme("dark-theme");
    else setTheme("light-theme");
  };

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
