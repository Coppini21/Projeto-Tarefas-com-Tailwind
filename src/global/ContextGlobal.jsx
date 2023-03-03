import React, { useEffect, useState } from "react";
import { useRequestData } from "../hooks/useRequestData";
import { instanceAxios } from "./api";
import { Navigate, useNavigate } from "react-router-dom";

export const ContextGlobal = React.createContext();

export const EstadoGlobal = ({ children }) => {
  const [dayTask, setDayTask] = useState("Segunda-Feira");
  const navigate = useNavigate()

  const [data, error, loading] = useRequestData({
    method: "get",
    path: "/tasks",
    param: {
      params: 
      {
        workspace: '1203990002370988', 
        assignee: '1203990077602562',
        opt_fields: 'completed, date, gid, name, notes, due_at, due_on'
      },
    }
  })


  const [listTask, setListTask] = useState([
    { day: "Segunda-Feira", tasks: [] },
    { day: "Terça-Feira", tasks: [] },
    { day: "Quarta-Feira", tasks: [] },
    { day: "Quinta-Feira", tasks: [] },
    { day: "Sexta-Feira", tasks: [] },
  ]);

  function groupTaskByDay(){
    const daysOfWeek = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    }

    const result = data?.data.data.reduce((acc, item) => {
      const day = item.due_on;
      if(day){
        const dayOfWeek = new Date(day).toLocaleDateString('en-US', {weekday: "long", timeZone: 'UTC'});
        acc[dayOfWeek].push(item)
      }

      return acc

    },daysOfWeek )


    const daysOfWeekArr = Object.entries(result? result : 0).map(([day, tasks]) => {
      return{
        day,
        tasks,
      }
    })

    setListTask(daysOfWeekArr)
  }

  //Modifiquei essa função => removerItem()

  function removerItem(tarefa) {
    console.log(tarefa)
    instanceAxios.delete(`/tasks/${tarefa.gid}`)
    .then(()=>{alert("Task Removida com sucesso"); location.reload(); navigate("/board"); })
    .catch((error) => {console.log(error)})

    // const taskRemove = listTask.find((item) => item.day === tarefa.day);
    // if (taskRemove) {
    //   const itemTaskRemove = taskRemove.tasks.filter(
    //     (item) => item.id !== tarefa.id
    //   );

    //   const listaAtualizada = listTask.map((item) => {
    //     if (item.day === taskRemove.day) {
    //       return {
    //         day: item.day,
    //         tasks: itemTaskRemove,
    //       };
    //     } else {
    //       return {
    //         ...item,
    //       };
    //     }
    //   });
    //   setListTask(listaAtualizada);
    // }
  }

  
  
  useEffect(() => {
    {!loading ? groupTaskByDay() : null}

  }, [loading])

 

  return (
    <ContextGlobal.Provider
      value={{ listTask, setListTask, dayTask, setDayTask, removerItem, loading, groupTaskByDay }}
    >
      {children}
    </ContextGlobal.Provider>
  );
};
