import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { ContextGlobal } from "../../global/ContextGlobal";
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'

export default function DetailsPage(){
    const {day, id} = useParams()
    const [showtask, setShowTask] = useState('')
    const { listTask } = useContext(ContextGlobal);

    useEffect(()=>{
        const dayFind = listTask&& listTask.find((item) => item.day === day)
        if(dayFind){
            const taskFind = dayFind.tasks.find((item) => item.id === id)
            if(taskFind){
                setShowTask(taskFind)
            }
        }
    }, [listTask, day, id])

    console.log(showtask)
    return(
        <div className="flex flex-col justify-center items-center bg-violet-300 min-h-screen p-3 w-full md:w-767 overflow-auto ">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center w-850 h-36 gap-y-5">
                    <ArrowLeftCircleIcon className="h-11 w-11 cursor-pointer text-violet-600 transition-all hover:text-black" />
                    <div className="flex gap-3">
                        <h1 className="text-black text-3xl font-bold">{showtask.name}</h1>
                        <div className="flex justify-center items-center bg-green-500 h-10 w-14 rounded-md text-white transition-all hover:bg-black  ">  
                            {showtask.status}
                        </div>
                    </div>
                    
                </div>
                
                <div>
                    <div className="w-850 h-72 bg-white rounded-lg shadow-lg">
                        {showtask.description}
                    </div>
                </div>

            </div>
        </div>
    )
}