import { EyeIcon } from "@heroicons/react/20/solid";
import { useState, useContext } from "react";
import { ContextGlobal } from "../../global/ContextGlobal";
import { useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

export default function Card({ name, list }) {
  const { listTask, setListTask } = useContext(ContextGlobal);
  const [check, setCheck] = useState(false);
  const styleCardTask = "flex justify-center items-center gap-2 shadow-xl";

  const navigate = useNavigate()

  const changeStatus = (e, item) => {
    const mapDay = listTask.map((task) => {
      if (task.day === item.day) {
        const upDateStatus = task.tasks.map((stat) => {
          if (e) {
            if (stat.id === item.id) {
              return {
                ...stat,
                status: "Done",
              };
            }
          } else {
            if (stat.id === item.id) {
              return {
                ...stat,
                status: "Open",
              };
            }
          }

          return stat;
        });

        return { ...task, tasks: upDateStatus };
      }
      return task;
    });
    setListTask(mapDay);
  };

  return (
    <div>
      <h2 className="w-80 bg-violet-600 h-11 flex  justify-center items-center rounded-md flex-col text-white" >
        <div className="flex justify-between w-4/5">
          {name}
          <div className="flex gap-2">
            <PencilIcon className="h-5 w-5 cursor-pointer transition-all hover:text-black" />
            <TrashIcon className="h-5 w-5 cursor-pointer transition-all hover:text-black" />
          </div>
         
        </div>
        <hr className="bg-gray-100 w-4/5 mt-1" /> 
      </h2>
      
      {list &&
        list.map((item, index) => (
          <div
            key={index}
            className={
              item.status === "Done"
                ? `bg-green-400 ${styleCardTask}`
                : `bg-violet-400 ${styleCardTask} transition-all hover:bg-violet-500`
            }
          >
            <input
              onChange={(e) => changeStatus(e.target.checked, item)}
              type="checkbox"
            />
            <h5 className="w-64">{item.name}</h5>
            <button onClick={() => navigate(`/details/${name}/${item.id}`)}>
              <EyeIcon className="w-5 text-violet-600 transition-all hover:text-black" />
            </button>
           
          </div>
        ))}
    </div>
  );
}
