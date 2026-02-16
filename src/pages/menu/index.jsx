import './index.css'
import { useNavigate } from 'react-router-dom';

export default function Menu() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Simulation of Manufacturable Products</h1>

            <p>Here you can check which products can be manufactured with the raw materials in stock and how much revenue they can generate.</p>

            <button onClick={() => navigate('/products')}>Products</button>
        </div>
    );
}