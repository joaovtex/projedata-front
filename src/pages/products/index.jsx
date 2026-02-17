import './index.css'
import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../api/productService';
import { useNavigate } from 'react-router-dom';
import ListCard from '../../components/listCard';

export default function Products() {
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [sortOption, setSortOption] = useState("name,asc")

    useEffect(() => {
        loadProducts()
    }, [sortOption])

    const loadProducts = async () => {
        try {
            const response = await getProducts({ sort: sortOption })
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to load products. Please try again.');
        }
    }

    const handleDelete = async (id) => {
        const productToDelete = products.find(p => p.id === id)

        const confirmDelete = window.confirm("Are you sure you want to delete the product: " + productToDelete.name + "?")
        if (!confirmDelete) { return }

        try {
            await deleteProduct(id)
            alert("Product deleted successfully!")
            loadProducts()
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
        }
    }

    function formatPrice(value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    return (
        <div className="list-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>

            <div className="list-header">
                <h1>Products</h1>

                <div className="filter-container">
                    <label>Order by: </label>
                    <select
                        className="selector"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="name,asc">Alphabetical (A → Z)</option>
                        <option value="name,desc">Alphabetical (Z → A)</option>
                        <option value="value,asc">Price (Low → High)</option>
                        <option value="value,desc">Price (High → Low)</option>
                    </select>
                </div>
            </div>


            <div className="list-content">
                {products.map((p) => (
                    <ListCard
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        value={formatPrice(p.value)}
                        onEdit={(id) => navigate(`/products/edit/${id}`)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {products.length === 0 && (
                <p className="empty-warning">No raw materials available.</p>
            )}
        </div>
    );
}