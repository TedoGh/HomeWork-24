import { useEffect, useState } from "react";
import "./App.css";
import { UserItems } from "./interfaces/user.interface";
import UserTodo from "./components/UserTodo";

const App = () => {
  const [userTodo, setUserTodo] = useState<UserItems[]>([]);

  useEffect(() => {
    fetch("/api/v1/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Response failed");
        return res.json();
      })
      .then((data) => setUserTodo(data.items))
      .catch((err) => console.log(err));
  }, []);

  const onFormSubmit = (taskName: string | undefined) => {
    fetch("/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify([{ taskName }]),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Response failed");
        return response.json();
      })
      .then((data) =>
        setUserTodo((prev: any) => [
          {
            taskName: data.items[0].taskName,
            id: data.items[0]._uuid,
          },
          ...prev,
        ])
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <UserTodo onFormSubmit={onFormSubmit} />
      {userTodo.map((item) => {
        return (
          <div key={item._uuid}>
            <h3>{item.taskName}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default App;
