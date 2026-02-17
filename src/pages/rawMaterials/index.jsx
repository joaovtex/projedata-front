import './index.css'
import { useEffect, useState } from 'react'
import { getRawMaterials, deleteRawMaterial } from '../../api/rawMaterialService';
import { useNavigate } from 'react-router-dom';
import ListCard from '../../components/listCard';

export default function RawMaterials() {
    const [rawMaterials, setRawMaterials] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadRawMaterials();
    }, []);

    const loadRawMaterials = async () => {
        try {
            const response = await getRawMaterials();
            setRawMaterials(response.data);
        } catch (error) {
            console.error('Error fetching raw materials:', error);
            alert('Failed to load raw materials. Please try again.');
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this raw material?');
        if (!confirmDelete) return;

        try {
            await deleteRawMaterial(id);
            alert('Raw material deleted successfully!');
            loadRawMaterials();
        } catch (error) {
            console.error('Error deleting raw material:', error);
            alert('Failed to delete raw material. Please try again.');
        }
    }

    return (
        <div className="list-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>

            <h1>Raw Materials</h1>

            <div className="list-content">
                {rawMaterials.map((rm) => (
                    <ListCard
                        key={rm.id}
                        id={rm.id}
                        name={rm.name}
                        stockQuantity={rm.stockQuantity}
                        onEdit={(id) => navigate(`/raw-materials/edit/${id}`)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {rawMaterials.length === 0 && (
                <p className="empty-warning">No raw materials available.</p>
            )}
        </div>
    )
}