import React, { useEffect, useState } from "react";
import ItemsList from "./Items.jsx";


function home() {
    const [inputText, setInputText] = useState("");  
    const [items, setItems] = useState([]);          
    const [erase, setErase] = useState();

    useEffect(() => {
        if (erase) {
            let newArray = items.filter((element) => element.id != erase);
            setItems(newArray);
        }
    }, [erase]);


    const updateText = (e) => {
        setInputText(e.target.value);
    }

    const handleSubmit = (e) => {
		//Comprobacion si la entrada de texto está vacía o no 
        e.preventDefault();     
		//si no lo está, 
        if (inputText.trim() == "") return;
        const newItem = {
            id: Math.random(),
            text: `${inputText}`
        }

        setItems([...items, newItem]);
        setInputText("");
        };

    return (
        <div className="app">
            <header className="app-header">
                <h1>LISTA DE TAREAS</h1>
                <form onSubmit={handleSubmit}>
                    <input className="app-input" onChange={updateText} value={inputText} placeholder="Añadir tarea..." />
                    <button className="app-submit" title="Add task"><i className="fas fa-plus"></i></button>
                </form>
                <ItemsList listaDeTareas={items} onDelete={setErase} />
                <footer className="app-foot">
                    <p style={{ fontSize: "16px" }}>By Diego Vega 2024 </p>
                </footer>
            </header>
        </div>
    );
}



export default home;