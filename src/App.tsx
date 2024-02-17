import React, { useState } from 'react';
import './App.css'; // Importa el archivo CSS donde colocarás los estilos

function ListaDeElementos() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event, index) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const updatedItems = [...items];
      updatedItems[index] = inputValue;
      setItems(updatedItems);
      setInputValue('');
      setEditIndex(null);
    }
  };

  const handleEdit = (index) => {
    setInputValue(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    // Reset editIndex if the deleted item was being edited
    if (editIndex === index) {
      setInputValue('');
      setEditIndex(null);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Ideas Nico</h2>
      <div className="items-container">
        {items.map((item, index) => (
          <div
            key={index}
            className="item"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div>{editIndex === index ? (
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
              />
            ) : (
              item
            )}</div>
            {hoverIndex === index && (
              <div className="item-buttons">
                {editIndex === index ? (
                  <button onClick={(event) => handleSubmit(event, index)}>Guardar</button>
                ) : (
                  <button onClick={() => handleEdit(index)}>Editar</button>
                )}
                <button onClick={() => handleDelete(index)}>X</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={(event) => handleSubmit(event, editIndex !== null ? editIndex : items.length)} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Añadir elemento"
            value={inputValue}
            onChange={handleChange}
            className="input"
          />
          <button type="submit" className="button">Añadir</button>
        </div>
      </form>
    </div>
  );
}

export default ListaDeElementos;
