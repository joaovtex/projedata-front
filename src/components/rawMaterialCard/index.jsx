import './index.css'

export default function RawMaterialCard(props) {
    return (
        <div className="raw-material-card">
            <div className="card-header">
                <div className="rm-label">
                    <h3>Name</h3>
                    <p>{props.name}</p>
                </div>

                <div className="rm-label">
                    <h3>Stock Quantity</h3>
                    <p>{props.stockQuantity} units</p>
                </div>
            </div>

            <div className="card-footer">
                <button className="edit-button" onClick={() => props.onEdit(props.id)}>Edit</button>
                <button className="delete-button" onClick={() => props.onDelete(props.id)}>Delete</button>
            </div>

        </div>
    )
}