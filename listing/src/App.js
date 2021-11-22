import React, { useState } from "react";
import { data } from "./data";
import JobInfo from "./components/JobInfo";
import Categories from "./components/Categories";
import TopCategories from "./components/TopCategories";
import top from "./assets/bg-header-desktop.svg";

const App = () => {
  const [jobs, setJobs] = useState(data);
  const [categories, setCategories] = useState([]);

  const filterCategory = (category) => {
    const newCategory = data.filter(
      (item) =>
        item.role === category ||
        item.level === category ||
        item.languages.includes(category) ||
        item.tools.includes(category)
    );

    if (categories.includes(category)) {
      return null;
    } else {
      const newItem = { id: new Date().getTime().toString(), title: category };
      setCategories([...categories, newItem]);
    }
    setJobs(newCategory);
  };

  const deleteItem = (id) => {
    setCategories(categories.filter((item) => item.id !== id));
    if (categories.length === 1) {
      setJobs(data);
      return;
    }
  };

  return (
    <>
      <header className="header">
        <img src={top} width="100%"/>
      </header>
      {categories.length > 0 && (
        <section className="categories top-categories">
          <TopCategories
            data={data}
            categories={categories}
            setCategories={setCategories}
            setJobs={setJobs}
            deleteItem={deleteItem}
          />
        </section>
      )}
      <div className="container">
        {jobs.map((item) => {
          return (
            <div className="job-listings" key={item.id}>
              <JobInfo item={item} />
              <div className="categories">
                <Categories item={item} filterCategory={filterCategory} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
