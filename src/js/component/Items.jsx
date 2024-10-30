import React, { useState } from "react";
import Swal from 'sweetalert2';



Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Tu usuario ha sido registrado con éxito!",
    showConfirmButton: false,
    timer: 7000
});




const name = prompt("Por favor, introduzca su nombre:");
alert(`Hola, ${name}!, Bienvenido a la lista de tareas.`);



const Items = ({ listaDeTareas, onDelete, onToggleLock, onEditTask }) => {
const [editMode, setEditMode] = useState(null);  // Estado para el modo de edición
const [editedText, setEditedText] = useState(""); // Estado para el texto editado

    const handleEdit = (task) => {
        setEditMode(task.id);
        setEditedText(task.text);
    };

    const handleSaveEdit = (id) => {
        onEditTask(id, editedText);
        setEditMode(null);
    };


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
