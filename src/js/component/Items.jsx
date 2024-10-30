import React, { useState } from "react";
import Swal from 'sweetalert2';

//lo siguiente es un mensaje de bienvenida//

Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Tu usuario ha sido registrado con éxito!",
    showConfirmButton: false,
    timer: 7000
});

//esto es un prompt para que el usuario introduzca su nombre//


const name = prompt("Por favor, introduzca su nombre:");
alert(`Hola, ${name}!, Bienvenido a la lista de tareas.`);

//lo siguente es para mostrar la lista de tareas//

const Items = ({ listaDeTareas, onDelete, onToggleLock, onEditTask }) => {

// Esta línea define el componente Items como una función. Toma como argumentos (props) un objeto que contiene cuatro propiedades:

// listaDeTareas: la lista de tareas que se va a mostrar.
// onDelete: una función que se llama cuando se quiere eliminar una tarea.
// onToggleLock: una función que permite cambiar el estado de "bloqueo" o "desbloqueo" de la tarea.
// onEditTask: una función para actualizar el texto de una tarea en particular.

    const [editMode, setEditMode] = useState(null);  // Estado para el modo de edición
    const [editedText, setEditedText] = useState(""); // Estado para el texto editado

// Aquí tenemos dos estados controlados por useState:
// editMode: guarda el id de la tarea que está en modo de edición. Si es null, significa que no se está editando ninguna tarea.
// editedText: guarda el texto que el usuario escribe mientras edita una tarea. Empieza vacío, pero se actualizará cada vez que el usuario escriba algo en el campo de edición.

    const handleEdit = (task) => {
        setEditMode(task.id);
        setEditedText(task.text);
    };
// Esta función handleEdit se llama cuando el usuario quiere editar una tarea específica:
// setEditMode(task.id): Cambia el estado de editMode al id de la tarea que queremos editar.
// setEditedText(task.text): Toma el texto actual de la tarea y lo guarda en editedText, así el usuario verá el texto actual de la tarea en el campo de edición cuando comience a escribir.

    const handleSaveEdit = (id) => {
        onEditTask(id, editedText);
        setEditMode(null);
    };
// handleSaveEdit es la función que se llama cuando el usuario termina de editar una tarea y quiere guardarla:
// onEditTask(id, editedText): Llama a la función onEditTask que le pasamos desde los props. Esta función probablemente actualiza la tarea en la lista principal, usando el id de la tarea y el nuevo texto que se escribió (editedText).
// setEditMode(null): Establece editMode en null para salir del modo de edición, lo que significa que la interfaz vuelve a mostrar la lista de tareas sin campos de edición abiertos.

    return (
        <div className="app-li-wrapper d-block">
            {listaDeTareas.length === 0 ? (
                <p><i>HOLA {name}, NO HAY TAREAS PENDIENTES!!</i></p>
            ) : (
                listaDeTareas.map((task, i) => (
                    <div className="app-li mx-auto" key={i} style={{ display: 'flex', justifyContent: 'space-between'}}>
                        {editMode === task.id ? (
                            <input 
                                type="text" 
                                value={editedText} 
                                onChange={(e) => setEditedText(e.target.value)} 
                                onBlur={() => handleSaveEdit(task.id)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleSaveEdit(task.id); // Llama a la función de guardar cuando se presiona Enter
                                                            }
                                                    }
                                        }                               
                            />
                        ) : (
                            <i>{task.text}</i>
                        )}
                        <div style={{ display: 'flex', alignItems: 'end', gap: '15px', alignSelf: 'center' }}>
                            <button onClick={() => onToggleLock(task.id)}>
                            {task.isLocked ? '🔒' : '🔓'}
                            </button>
                            <button onClick={() => handleEdit(task)}>
                            ✏️ {/* Icono de lápiz */}
                            </button>
                            <button id={task.id} className="app-li-delete" onClick={() => onDelete(task.id)}>
                            &#10006; {/*x en unicode*/}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Items;
