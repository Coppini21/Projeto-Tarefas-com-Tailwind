import React, { useContext, useEffect } from "react";
import Input from "../../components/Input";
import Card from "../../components/Card";
import { ContextGlobal } from "../../global/ContextGlobal";
import { PlusCircleIcon } from "@heroicons/react/24/solid";


export default function BoardPage() {
  const { listTask, setListTask, loading } = useContext(ContextGlobal);
  

  function appendTask() {
    const objTask = {
      day: `Exemplo-${listTask.length + 1}: Domingo`,
      tasks: [],
    };

    setListTask([...listTask, objTask]);
  }


  return (
    <div className="flex flex-wrap bg-violet-300 min-h-screen p-3 w-full md:w-767 overflow-auto ">
      <Input />
      <div className="flex w-full justify-evenly gap-5 flex-wrap md:flex-col md:items-center md:w-767 ">
        {listTask.length > 0 ? (
          <>
            {listTask.map((item, index) => (
              <Card key={index} name={item.day} list={item.tasks}  />
            ))}
            <div className="h-16 flex justify-center items-center" >
              <PlusCircleIcon
                onClick={appendTask}
                className="h-11 w-11 cursor-pointer text-violet-600 transition-all hover:text-black"
              />
            </div>
          </>
        ) : (
          <div className="h-16 flex justify-center items-center" id={`${localStorage.getItem("idDescription") ? localStorage.getItem("idDescription") : "false"}`}>
            
            <h1>Carregando...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
