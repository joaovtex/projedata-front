import './index.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRawMaterialById, updateRawMaterial } from '../../api/rawMaterialService';

export default function EditRawMaterial() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [stockQuantity, setStockQuantity] = useState(0);

    useEffect(() => {
        loadRawMaterial();
    }, []);

    const loadRawMaterial = async () => {
        try {
            const response = await getRawMaterialById(id);
            setName(response.data.name);
            setStockQuantity(response.data.stockQuantity);
        } catch (error) {
            console.error('Error loading raw material:', error);
            alert('Failed to load raw material.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateRawMaterial(id, { name, stockQuantity });
            alert('Raw material updated successfully!');
            navigate(-1);
        } catch (error) {
            console.error('Error updating raw material:', error);

            const apiMessage = error.response?.data?.message
            alert(apiMessage || 'Failed to update raw material.');
        }
    };

    return (
        <div className="new-raw-material-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>

            <h1>Edit Raw Material</h1>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                        type="number"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(Number(e.target.value))}
                    />
                </div>

                <div className="buttons">
                    <button type="submit" className="submit-button">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
