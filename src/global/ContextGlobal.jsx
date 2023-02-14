import React, { useState } from "react";

export const ContextGlobal = React.createContext();

export const EstadoGlobal = ({ children }) => {
  const [listTask, setListTask] = useState([
    {
      day: "Segunda-Feira",
      tasks: []
    },
    {
      day: "Terça-Feira",
      tasks: []
    },
    {
      day: "Quarta-Feira",
      tasks: []
    },
    {
      day: "Quinta-Feira",
      tasks: []
    },
    {
      day: "Sexta-Feira",
      tasks: []
    }
  ]);

  return (
    <ContextGlobal.Provider value={{ listTask, setListTask }}>
      {children}
    </ContextGlobal.Provider>
  );
};
