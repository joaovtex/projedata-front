import './index.css'
import { useState } from 'react';
import { createRawMaterial } from '../../api/rawMaterialService';
import { useNavigate } from 'react-router-dom';

export default function RegisterRawMaterial() {
    const [name, setName] = useState('');
    const [stockQuantity, setStockQuantity] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createRawMaterial({ name, stockQuantity });
            alert('Raw material registered successfully!');
            setName('');
            setStockQuantity(0);
        } catch (error) {
            console.error('Error registering raw material:', error);

            const apiMessage = error.response?.data?.message
            alert(apiMessage || 'Failed to register raw material. Please try again.');
        }
    }

    return (
        <div className="new-raw-material-container">
            <h1>
                Register Raw Material
            </h1>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Raw material name'
                    />
                </div>

                <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                        type="number"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(Number(e.target.value))}
                        placeholder='0'
                    />
                </div>

                <div className="buttons">
                    <button type="submit" className="submit-button">Register</button>
                    <button type="button" className="cancel-button" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </form>
        </div>
    );
}