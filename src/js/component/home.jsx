import React, { useEffect, useState } from "react";
import ItemsList from "./Items.jsx";

function Home() {

 

    const [inputText, setInputText] = useState("");  
    const [items, setItems] = useState([]);          
    const [erase, setErase] = useState();


    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem("taskList")) || [];
        const lockedItems = savedItems.filter(item => item.isLocked);
        setItems(lockedItems);
    }, []);



    useEffect(() => {
        const lockedItems = items.filter(item => item.isLocked);
        localStorage.setItem("taskList", JSON.stringify(lockedItems));
    }, [items]);





    useEffect(() => {
        if (erase) {
            let newArray = items.filter((element) => element.id !== erase);
            setItems(newArray);
        }
    }, [erase]);




    const updateText = (e) => {
        setInputText(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim() === "") return;
        
        const newItem = {
            id: Math.random(),
            text: `${inputText}`,
            isLocked: false  // Estado inicial del candado como "abierto"
        }

        setItems([...items, newItem]);
        setInputText("");
    };
    


    const toggleLock = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, isLocked: !item.isLocked } : item
            )
        );
    };


    const editTask = (id, newText) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, text: newText } : item
            )
        );
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>LISTA DE TAREAS</h1>
                <form onSubmit={handleSubmit}>
                    <input className="app-input" onChange={updateText} value={inputText} placeholder="Añadir tarea..." />
                    <button className="app-submit" title="Add task"><i className="fas fa-plus"></i></button>
                </form>
                <ItemsList listaDeTareas={items} onDelete={setErase} onToggleLock={toggleLock} onEditTask={editTask} />
                <footer className="app-foot">
                    <p style={{ fontSize: "16px" }}>By Diego Vega 2024 </p>
                </footer>
            </header>
        </div>
    );
}


export default Home;
