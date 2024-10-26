import React from "react";

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

const Items = ({ listaDeTareas, onDelete }) => {
    return (
        <div className="app-li-wrapper d-block">
            {listaDeTareas.length === 0 ? (
                <p><i>HOLA {name}, NO HAY TAREAS PENDIENTES!!</i></p>
            ) : (
                listaDeTareas.map((task, i) => (
                    <div className="app-li mx-auto" key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <i>- {task.text}</i>
                        <button id={task.id} className="app-li-delete" onClick={() => onDelete(task.id)}>
                            &#10006; {/*x en unicode*/}
                        </button>
                    </div>
                ))
            )}
        </div>
    )
}

export default Items;