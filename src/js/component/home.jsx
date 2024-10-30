import React, { useEffect, useState } from "react";
import ItemsList from "./Items.jsx";

// //Este código importa las dependencias necesarias de React. useState y useEffect son hooks de React:
// useState: permite crear estados locales en un componente funcional.
// useEffect: permite ejecutar funciones en momentos específicos del ciclo de vida del componente.
// También se importa ItemsList, que es un componente que va a mostrar la lista de tareas y tiene funcionalidades de eliminación, edición y bloqueo.//

function Home() {

    // Esta es la función principal del componente Home, donde se define y organiza toda la lógica de la aplicación.//

    const [inputText, setInputText] = useState("");  
    const [items, setItems] = useState([]);          
    const [erase, setErase] = useState();
//Aquí se están definiendo tres estados:

// inputText: guarda el texto de la tarea que se va a agregar.
// items: guarda el listado de tareas actual.
// erase: guarda el id de la tarea que se va a eliminar.//



// Cargar el estado inicial desde localStorage y filtrar solo los elementos cerrados por candado

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem("taskList")) || [];
        const lockedItems = savedItems.filter(item => item.isLocked);
        setItems(lockedItems);
    }, []);

//Este useEffect carga los datos de localStorage cuando el componente se monta (primer renderizado). Explicación detallada:

// Se obtiene el elemento taskList de localStorage (o un arreglo vacío si no existe).
// Filtra las tareas para incluir solo las que están bloqueadas (isLocked).
// Actualiza el estado items con estas tareas bloqueadas.



// Guardar solo las tareas con isLocked === true en localStorage cuando "items" cambie

    useEffect(() => {
        const lockedItems = items.filter(item => item.isLocked);
        localStorage.setItem("taskList", JSON.stringify(lockedItems));
    }, [items]);



// Este useEffect se ejecuta cada vez que cambia el estado items. Guarda en localStorage solo las tareas que están bloqueadas.

    useEffect(() => {
        if (erase) {
            let newArray = items.filter((element) => element.id !== erase);
            setItems(newArray);
        }
    }, [erase]);


// Este useEffect observa el estado erase. Si se establece un valor en erase (indica el id de una tarea a eliminar), filtra items para crear un nuevo arreglo sin esa tarea, y actualiza items con ese nuevo arreglo.

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
    
// Esta función:

// Previene el comportamiento por defecto del formulario.
// Verifica que inputText no esté vacío.
// Crea una nueva tarea con un id aleatorio, el texto de inputText, e isLocked en false.
// Agrega la tarea al estado items.
// Limpia el campo de entrada inputText.


// Función para alternar el estado del candado de una tarea y darle como bloqueado o no

    const toggleLock = (id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, isLocked: !item.isLocked } : item
            )
        );
    };
// Esta función alterna el estado isLocked de una tarea específica, buscando el id de la tarea y cambiando isLocked a su valor opuesto.


// Función para editar una tarea en la linea de edicion de la tarea

    const editTask = (id, newText) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, text: newText } : item
            )
        );
    };
// Esta función permite editar el texto de una tarea específica. Busca el id de la tarea y actualiza su propiedad text con newText.onKeyDown= {(even)=>{if (even.key === "Enter"){addTask()}}}


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
// Este código define cómo se mostrará la interfaz:

// Encabezado (header): muestra el título "LISTA DE TAREAS".
// Formulario: contiene un campo de entrada (input) para añadir tareas y un botón de agregar.
// Componente ItemsList: se le pasan listaDeTareas, onDelete, onToggleLock, y onEditTask para manejar las tareas.
// Pie de página (footer): muestra un mensaje personalizado "By Diego Vega 2024".

export default Home;
