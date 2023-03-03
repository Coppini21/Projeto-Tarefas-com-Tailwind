import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ContextGlobal } from "../../global/ContextGlobal";
import {
  ArrowLeftCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

import { useRequestData } from "../../hooks/useRequestData";
import { instanceAxios } from "../../global/api";

export default function DetailsPage() {
  const { day, id } = useParams();
  const [showtask, setShowTask] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [valorDescricao, setValorDescricao] = useState("");
  const { listTask, setListTask, groupTaskByDay } = useContext(ContextGlobal);
  const navigate = useNavigate();

  const [data, error, loading] = useRequestData({
    method: "get",
    path: `/tasks/${id}`,
    param: {
      params: {
        workspace: "1203990002370988",
        assignee: "1203990077602562",
        opt_fields: "completed, date, gid, name, notes, due_at, due_on",
      },
    },
  });

  console.log(data);

  // Modifiquei essa função => clickStatus()
  function clickStatus() {
    let diaEncontrado = listTask.find((item) => item.day === day);

    if (diaEncontrado) {
      diaEncontrado.tasks.forEach((item) => {
        console.log(item);
        if (item.completed === true) {
          setStatus(false);
        } else {
          setStatus(true);
        }
      });

      console.log(status);
    }

    const options = {
      method: "PUT",
      url: `https://app.asana.com/api/1.0/tasks/${id}`,
      params: { opt_fields: "completed,date,gid,name,notes,due_at,due_on" },
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization:
          "Bearer 1/1203990077602562:5574b297c7fe6d9f9f28f3804cdfc33e",
      },

      data: {
        data: {
          completed: Boolean(status),
        },
      },
    };

    instanceAxios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });

    // let dayFind = listTask.find((item) => item.day === day);

    // if(dayFind){
    //   const taskFind = dayFind.tasks.map((item) => {
    //     console.log(item.completed)
    //     if(item.completed === true){
    //       item.completed = true
    //     }else{
    //       item.completed = false
    //     }

    //     return item
    //   });

    //   let atualizandoLista = listTask.map(item => {
    //     if(item.day === day){
    //       taskFind
    //       }else{
    //         item
    //       }

    //     return item
    //   })

    // setListTask(atualizandoLista)
  }

  // Modifiquei essa função =>addDescription()
  function addDescription(event) {
    console.log(description);

    event.stopPropagation();
    let texteArea = document.getElementById(`valorTextArea-${id}`);
    localStorage.setItem("idDescription", `valorTextArea-${id}`);
    let dayFind = listTask.find((item) => item.day === day);
    console.log(dayFind);
    if (dayFind) {
      document.getElementById(`valorTextArea-${id}`).disabled = false;

      window.addEventListener("click", function (event) {
        event.stopPropagation();
        if (!texteArea.contains(event.target)) {
          const options = {
            method: "PUT",
            url: `https://app.asana.com/api/1.0/tasks/${id}`,
            params: {
              opt_fields: "completed,date,gid,name,notes,due_at,due_on",
            },
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              authorization:
                "Bearer 1/1203990077602562:5574b297c7fe6d9f9f28f3804cdfc33e",
            },

            data: {
              data: {
                notes: description,
              },
            },
          };

          instanceAxios
            .request(options)
            .then(function (response) {
              console.log(response.data);
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      });
    }

    // event.stopPropagation();
    // let texteArea = document.getElementById(`valorTextArea-${id}`)
    // localStorage.setItem("idDescription", `valorTextArea-${id}`)
    // let dayFind = listTask.find((item) => item.day === day);
    // console.log(dayFind)
    // if(dayFind){
    //   document.getElementById(`valorTextArea-${id}`).disabled = false

    //   window.addEventListener("click", function(event) {
    //     event.stopPropagation();
    //     if(!texteArea.contains(event.target)){
    //       document.getElementById(`valorTextArea-${id}`).disabled ? null : false
    //       let atualizarDescricao = dayFind.tasks.map(item => {
    //         if(item.gid === id){
    //           return{
    //             ...item,
    //             notes: texteArea.value,
    //           }
    //         }else{
    //           return{
    //             ...item
    //           }
    //         }
    //       })

    //       if(atualizarDescricao){
    //         const atualizarLista = listTask.map(item => {
    //           if(item.day === day){
    //             return{
    //               ...item,
    //               tasks: atualizarDescricao
    //             }
    //           } else{
    //             return {
    //               ...item
    //             }
    //           }
    //         })

    //         setListTask(atualizarLista)
    //       }
    //     }
    //   })
    // }
  }

  // Modifiquei essa função => removeTask()
  function removeTask() {
    instanceAxios
      .delete(`/tasks/${id}`)
      .then(() => {
        alert("Task Removida com sucesso");
        location.reload();
        navigate("/board");
      })
      .catch((error) => {
        console.log(error);
      });

    // let dayFind = listTask.find((item) => item.day === day);
    // if(dayFind){
    //   const findTaskRemove = dayFind.tasks.filter(item => item.id !== id)
    //   console.log(findTaskRemove)

    //   const atualizarLista = listTask.map(item => {
    //     if(item.day === day){
    //       return{
    //         ...item,
    //         tasks: findTaskRemove
    //       }
    //     } else{
    //       return {
    //         ...item
    //       }
    //     }
    //   })

    //   setListTask(atualizarLista)
    //   navigate("/board")
    // }
  }

  // Modifiquei essa função => useEffect()

  useEffect(() => {
    const dayFind = listTask && listTask.find((item) => item.day === day);
    if (dayFind) {
      const taskFind = dayFind.tasks.find((item) => item.gid === id);
      if (taskFind) {
        setShowTask(taskFind);
      }
    } else {
      navigate("/board");
    }
  }, [showtask, id, day]);

  console.log(status);
  console.log(id);

  return (
    <div className="flex flex-col justify-center items-center bg-violet-300 min-h-screen p-3 w-full md:w-767 overflow-auto ">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-850 h-36 gap-y-5">
          <ArrowLeftCircleIcon
            onClick={() => navigate("/board")}
            className="h-11 w-11 cursor-pointer text-violet-600 transition-all hover:text-black"
          />
          <div className="flex gap-3">
            <h1 className="text-black text-3xl font-bold">{showtask.name}</h1>
            <div
              onClick={clickStatus}
              className={
                showtask.completed === true
                  ? "flex justify-center items-center bg-green-500 h-10 w-14 rounded-md text-white transition-all hover:bg-black"
                  : "flex justify-center items-center bg-red-600 h-10 w-14 rounded-md text-white transition-all hover:bg-black"
              }
            >
              {showtask.completed === true ? "Done" : "Open"}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-center items-center w-850 h-72 bg-white rounded-lg shadow-lg">
            <div className="h-4/5 w-1 bg-violet-600 "></div>
            <textarea
              disabled
              placeholder={showtask.notes}
              className="w-650 h-4/5 px-2 BO"
              id={`valorTextArea-${id}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex flex-col gap-y-32">
              <PencilIcon
                onClick={(event) => addDescription(event)}
                className="h-5 w-5 cursor-pointer ml-4 text-violet-600 transition-all hover:text-black"
              />
              <TrashIcon
                onClick={removeTask}
                className="h-5 w-5 cursor-pointer ml-4 text-violet-600 transition-all hover:text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
