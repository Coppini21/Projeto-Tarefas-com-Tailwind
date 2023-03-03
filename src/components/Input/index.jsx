import { useCallback, useContext, useEffect, useState } from "react";
import uuid from "react-uuid";
import { ContextGlobal } from "../../global/ContextGlobal";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { instanceAxios } from "../../global/api";


export default function Input() {
  const { listTask, setListTask, dayTask, setDayTask, removerItem, groupTaskByDay } =
    useContext(ContextGlobal);

  const [nameTask, setNameTask] = useState("");

 //Modifiquei essa função => addNewTask()

  function addNewTask() {
    let dataDeHoje = new Date()
    let dia = String(dataDeHoje.getDate()).padStart(2, '0');
    var mes = String(dataDeHoje.getMonth() + 1).padStart(2, '0');
    var ano = dataDeHoje.getFullYear();

    let diaAtual = ano + "-" + mes + "-" + dia;
    console.log(diaAtual)



    console.log(dataDeHoje)
    const dataTask = {
      data: {
        name: nameTask,
        completed: false,
        due_on: diaAtual,
        notes: "",
        assignee:"1203990077602562",
        workspace: "1203990002370988",
      }
    }
    
    instanceAxios.post(`/tasks`, dataTask)
    .then(function (response){
      console.log(response?.data); groupTaskByDay()
      location.reload()
    })

    .catch(function(error){
      console.error(error.response.data); 
    })
    

  //   // const mapDay = listTask.map((item) => {
  //   //   if (item.day === dayTask) {
  //   //     return {
  //   //       ...item,
  //   //       tasks: [
  //   //         ...item.tasks,
  //   //         {
  //   //           id: uuid(),
  //   //           name: nameTask,
  //   //           description: "",
  //   //           status: "Open",
  //   //           day: dayTask,
  //   //         },
  //   //       ],
  //   //     };
  //   //   }

  //   //   return item;
  //   // });

  //   // setListTask([mapDay]);
  //   // setNameTask("");

   
  }

 

  // useEffect(() => {
  //   axios
  //   .request(criar)
  //   .then((sucess) => {

  //     console.log(sucess.data.data) 
      
  //   })
  //   .catch((error) => {console.log(error)})

  // }, [addNewTask, listTask, criar])

  function sair() {
    let relembrar = localStorage.getItem("remember");
    console.log(relembrar);
    if (relembrar === "true") {
      localStorage.removeItem("autorizacao");
      window.location.reload();
      console.log("entrou");
    } else {
      localStorage.clear();
      window.location.reload();
    }
  }

  function atualizarDia(e) {
    setDayTask(e.target.value);
  }

  useEffect(() => {
    const teste = document.getElementById("teste");
    setDayTask(teste.value);
  }, [removerItem]);



  return (
    <div className="flex w-full justify-center m-auto rounded gap-2">
      <div className="">
        <ArrowLeftOnRectangleIcon
          onClick={sair}
          className="h-12 w-12 cursor-pointer absolute -ml-24 lg:static lg:ml-0 text-violet-600 transition-all hover:text-black"
        />
      </div>

      <input
        onChange={(e) => setNameTask(e.target.value)}
        type="text"
        value={nameTask}
        placeholder="New Taks"
        className="rounded-md border-inherit w-96 shadow-md"
      />
      <select
        onChange={(e) => atualizarDia(e)}
        className="border-inherit rounded-md shadow-md"
        id="teste"
      >
        {listTask.map((item, index) => (
          <option key={index}>{item.day}</option>
        ))}
      </select>
      <button
        onClick={addNewTask}
        className="w-10 bg-green-500 rounded-lg text-white shadow-md transition-all hover:bg-black"
      >
        Add
      </button>
    </div>
  );
}
