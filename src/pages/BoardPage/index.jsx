import React, { useContext } from "react"
import Input from "../../components/Input"
import Card from "../../components/Card"
import { ContextGlobal } from "../../global/ContextGlobal"
import { PlusCircleIcon } from '@heroicons/react/24/solid'

export default function BoardPage(){
    const {listTask} = useContext(ContextGlobal)

    return(
        <div className="flex flex-wrap bg-violet-300 min-h-screen p-3 w-full md:w-767 overflow-auto ">
            <Input />
            <div className="flex w-full justify-evenly gap-5 flex-wrap md:flex-col md:items-center md:w-767 ">
                {listTask.map((item) => 
                    <Card key={item.id} name={item.day} list={item.tasks}/>
                )}
                <div>
                    <PlusCircleIcon className="h-11 w-11 cursor-pointer text-violet-600 transition-all hover:text-black" />
                </div>
            </div>
            
        </div>
    )
}