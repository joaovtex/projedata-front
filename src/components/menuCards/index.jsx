import './index.css';

export default function MenuCards(props) {
    return (
        <div className="menu-card">
            <div className="card-grid">
                <div className="item">
                    <h3>
                        Porudct
                    </h3>
                    <p>
                        {props.title}
                    </p>
                </div>

                <div className="item">
                    <h3>
                        Possible Procution
                    </h3>
                    <p>
                        {props.possibleProduction}
                    </p>
                </div>

                <div className="item">
                    <h3>
                        Unit Price
                    </h3>
                    <p>
                        {props.unitPrice}
                    </p>
                </div>

                <div className="item">
                    <h3>
                        Total Revenue
                    </h3>
                    <p>
                        {props.totalRevenue}
                    </p>
                </div>
            </div>

        </div>
    );
}