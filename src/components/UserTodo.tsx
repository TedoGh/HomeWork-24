import { useState } from "react";

interface UserTodoI {
  onFormSubmit: (taskName: string | undefined) => void;
}

const UserTodo = ({ onFormSubmit }: UserTodoI) => {
  const [taskName, setTaskName] = useState<string>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFormSubmit(taskName);
    setTaskName("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="taskName"
        value={taskName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTaskName(e.target.value)
        }
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserTodo;
