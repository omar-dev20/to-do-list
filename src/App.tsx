import { useMemo, useRef } from "react";
import useTask from "./hooks/useAddTasks";
function App() {
  const { tasks, setTasks } = useTask();
  const tasksDone = tasks.filter((task) => task.checked).length;
  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    return Math.floor((tasksDone / tasks.length) * 100);
  }, [tasksDone, tasks.length]);
  const handleAddTask = () => {
    const text = newTAskRef.current?.value;
    if (!text) return;

    setTasks((prev) => [
      ...prev,
      { id: prev.length + 1, checked: false, data: text },
    ]);

    newTAskRef.current!.value = "";
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };
  const handleCheckbox = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task,
      ),
    );
  };
  const newTAskRef = useRef<HTMLInputElement>(null);
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((err) =>
          console.log("Service Worker Registration Failed, Error: ", err),
        );
  }
  function setAlaram(second: number) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            if (navigator.serviceWorker.controller) {
              navigator.serviceWorker.controller.postMessage({
                action: "set_Alaram",
                delay:second * 1000,
              })
               alert('تم تعيين المهمة بنجاح!')
            }
          }
          else {
            alert('لم يتم تعيين المهمة بسبب عدم الوصول إلى خادم الخدمة!')
          }
        });
      }
    });
  }
  setAlaram(10)
  return (
    <>
      <div className="container">
        <h1>TO DO LIST</h1>
        <div className="form">
          <input
            ref={newTAskRef}
            onKeyDown={handleKeyPress}
            className="input"
            type="text"
            placeholder="Add a new task..."
          />
          <button onClick={handleAddTask}> + </button>
        </div>
      </div>
      <div className="container">
        <ul>
          {tasks.map((task) => (
            <li
              className={`group  task  bg-white/10 backdrop-blur-md  p-6  rounded-2xl shadow-lg m-4  flex justify-between gap-4 items-center ${task.checked ? "border-green-500 border-2 shadow-green-500/20" : ""}`}
              key={task.id}
            >
              <div className="flex gap-4">
                <input
                  type="checkbox"
                  className="block w-4 h-4 text-primary cursor-pointer "
                  checked={task.checked}
                  onChange={() => handleCheckbox(task.id)}
                />
                <span
                  onClick={() => handleCheckbox(task.id)}
                  className={`text-l font-bold break-all cursor-pointer ${
                    task.checked ? " opacity-70" : ""
                  }`}
                >
                  {task.data}
                </span>
              </div>

              <i
                onClick={() => handleDeleteTask(task.id)}
                className="opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-300 fa-solid fa-x cursor-pointer !text-red-500"
              ></i>
            </li>
          ))}
        </ul>
        {tasks.length > 0 ? (
          <>
            <div className="font-bold text-lg">
              Progress Bar: {tasks.filter((task) => task.checked).length} /{" "}
              {tasks.length}
            </div>
            <div className="tasks">
              <div
                className="tasks-done bg-gradient-to-r from-green-500 to-green-700"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center py-6 font-bold text-xl">
            No tasks yet 🚀
          </p>
        )}
      </div>
    </>
  );
}

export default App;
