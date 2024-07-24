import React, { useEffect, useState } from 'react';
import { fetchItems, deleteItem } from '../api/itemapi';
import ItemForm from './ItemForm';

const ItemList = ({ onEdit }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchItems();
            setItems(data);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await deleteItem(id);
        setItems(items.filter(item => item._id !== id));
    };

    const handleView = (item) => {
        alert(`Name: ${item.name}\nQuantity: ${item.quantity}\nPrice: $${item.price}`);
    };

    return (
        <div>
            <h2>Item List</h2>
            <table className="item-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                            <td>
                                <button className="view-button" onClick={() => handleView(item)}>View</button>
                                <button className="update-button" onClick={() => onEdit(item._id)}>Update</button>
                                <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemList;
