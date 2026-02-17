import './index.css'
import { useEffect, useState } from 'react';
import { getProduction } from '../../api/productionService';
import MenuButton from '../../components/menuButton';
import menuButtonElements from '../../components/menuButton/componentElements';
import MenuCards from '../../components/menuCards';

export default function Menu() {
    const [production, setProduction] = useState([]);

    useEffect(() => {
        loadProduction();
    }, []);

    const loadProduction = async () => {
        try {
            const response = await getProduction();
            setProduction(response.data);
        } catch (error) {
            console.error("Failed to load production data:", error);
        }
    }

    function formatPrice(value) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    return (
        <div className="container">
            <div className='texts'>
                <h1>Simulation of Manufacturable Products</h1>

                <p>Here you can check which products can be manufactured with the raw materials in stock and how much revenue they can generate.</p>
            </div>

            <div className="menu-buttons">
                {menuButtonElements.map((button, index) => (
                    <MenuButton
                        key={index}
                        text={button.text}
                        link={button.path}
                    />
                ))}
            </div>

            <div className='texts'>
                <h3>
                    Manufacturable products
                </h3>
            </div>

            <div className="menu-cards">
                {production.map((product) => (
                    <MenuCards
                        key={product.productId}
                        title={product.productName}
                        possibleProduction={product.possibleQuantity}
                        unitPrice={formatPrice(product.unitValue)}
                        totalRevenue={formatPrice(product.totalValue)}
                    />
                ))}
            </div>

            {production.length === 0 && (
                <p className="empty-warning">No products can be manufactured with current stock.</p>
            )}

        </div>
    );
}