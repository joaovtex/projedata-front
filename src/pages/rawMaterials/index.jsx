import './index.css'
import { useEffect, useState } from 'react'
import { getRawMaterials, deleteRawMaterial } from '../../api/rawMaterialService';
import { useNavigate } from 'react-router-dom';
import ListCard from '../../components/listCard';

export default function RawMaterials() {
    const navigate = useNavigate();

    const [rawMaterials, setRawMaterials] = useState([]);
    const [sortOption, setSortOption] = useState('name,asc')

    useEffect(() => {
        loadRawMaterials();
    }, [sortOption]);

    const loadRawMaterials = async () => {
        try {
            const response = await getRawMaterials({ sort: sortOption });
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

            <div className="list-header">
                <h1>Raw Materials</h1>

                <div className="filter-container">
                    <label>Order by: </label>
                    <select
                        className="selector"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="name,asc">Alphabetical (A → Z)</option>
                        <option value="name,desc">Alphabetical (Z → A)</option>
                        <option value="stockQuantity,asc">Stock Quantity (Low → High)</option>
                        <option value="stockQuantity,desc">Stock Quantity (High → Low)</option>
                    </select>
                </div>
            </div>


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