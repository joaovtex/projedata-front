import './index.css'

export default function ListCard(props) {
    return (
        <div className="list-card">
            <div className="card-header">
                <div className="card-label">
                    <h3>Name</h3>
                    <p>{props.name}</p>
                </div>

                {props.stockQuantity != null && (
                    <div className="card-label">
                        <h3>Stock Quantity</h3>
                        <p>{props.stockQuantity} units</p>
                    </div>
                )}

                {props.value && (
                    <div className="card-label">
                        <h3>Price</h3>
                        <p>{props.value}</p>
                    </div>
                )}

            </div>

            <div className="card-footer">
                <button className="edit-button" onClick={() => props.onEdit(props.id)}>Edit</button>
                <button className="delete-button" onClick={() => props.onDelete(props.id)}>Delete</button>
            </div>

        </div>
    )
}