import { useContext, useState } from "react"
import uuid from "react-uuid"
import { ContextGlobal } from "../../global/ContextGlobal"

export default function Input(){
    const {listTask, setListTask} = useContext(ContextGlobal)
    const [nameTask, setNameTask] = useState("")
    const [dayTask, setDayTask] = useState("Segunda-Feira")


    function addNewTask(){
        const mapDay = listTask.map((item) => {
            if(item.day === dayTask){
                return{
                    ...item,
                    tasks: [
                        ...item.tasks,
                        {
                            id: uuid(),
                            name: nameTask,
                            description: "",
                            status: "Open",
                            day: dayTask
                        }
                    ]
                }
            }

            return item
        })

        setListTask(mapDay)
        setNameTask("")
    }

    console.log(listTask)
    return(
        <div className="flex m-auto rounded gap-2">
            <input onChange={(e) => setNameTask(e.target.value)} type="text" value={nameTask} placeholder="New Taks" className="rounded-md border-inherit w-96 shadow-md" />
            <select onChange={(e) => setDayTask(e.target.value)} className="border-none rounded-md shadow-md" >
                {listTask.map((item, index) => <option key={index}>{item.day}</option>)}
            </select>
            <button onClick={addNewTask} className="w-10 bg-green-500 rounded-lg text-white shadow-md transition-all hover:bg-black">Add</button>
        </div>
    )
}