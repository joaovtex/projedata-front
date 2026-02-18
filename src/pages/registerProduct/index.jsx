import './index.css'
import { useEffect, useState } from 'react'
import { createProduct } from '../../api/productService'
import { createProductRawMaterial, deleteProductRawMaterial } from '../../api/productRawMaterialService'
import { getRawMaterials } from '../../api/rawMaterialService'
import { useNavigate } from 'react-router-dom'

export default function RegisterProduct() {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [value, setValue] = useState(0)
    const [productId, setProductId] = useState(null)

    const [rawMaterials, setRawMaterials] = useState([])
    const [selectedRawMaterials, setSelectedRawMaterials] = useState("")
    const [requiredQuantity, setRequiredQuantity] = useState(0)
    const [associations, setAssociations] = useState([])

    useEffect(() => {
        if (productId) {
            loadRawMaterials()
        }
    }, [productId])

    const loadRawMaterials = async () => {
        try {
            const response = await getRawMaterials()
            setRawMaterials(response.data)
        } catch (error) {
            console.error("Error loading raw materials:", error)
            alert("Failed to load raw materials. Please try again.")
        }
    }

    const handleCreateProduct = async (e) => {
        e.preventDefault()

        try {
            const response = await createProduct({ name, value })
            setProductId(response.data.id)
            alert("Product created successfully! Now you can add raw materials.")
        } catch (error) {
            console.error("Error creating product:", error)

            const apiMessage = error.response?.data?.message
            alert(apiMessage || "Failed to create product. Please try again.")
        }
    }

    const handleAddAssociation = async () => {
        if (!selectedRawMaterials || requiredQuantity <= 0) {
            alert("Please select a raw material and enter a valid quantity.")
            return
        }

        try {
            const response = await createProductRawMaterial({
                productId: Number(productId),
                rawMaterialId: Number(selectedRawMaterials),
                requiredQuantity: Number(requiredQuantity)
            })

            const selectedRawMaterial = rawMaterials.find(
                (rm) => rm.id === Number(selectedRawMaterials)
            )

            // update association list
            setAssociations([
                ...associations,
                {
                    id: response.data.id,
                    rawMaterialId: selectedRawMaterial.id,
                    name: selectedRawMaterial.name,
                    requiredQuantity
                },
            ])

            // remove from available raw materials
            setRawMaterials(rawMaterials.filter(rm => rm.id !== selectedRawMaterial.id))

            setSelectedRawMaterials("")
            setRequiredQuantity(0)
        } catch (error) {
            alert("Failed to add raw material association. Please try again.")
        }
    }

    const handleDeleteAssociation = async (associationId) => {
        try {
            await deleteProductRawMaterial(associationId)

            const associationToRemove = associations.find(
                (assoc) => assoc.id === associationId
            )

            setAssociations(
                associations.filter((assoc) => assoc.id !== associationId)
            )

            const removedRawMaterial = {
                id: associationToRemove.rawMaterialId,
                name: associationToRemove.name
            }

            setRawMaterials([...rawMaterials, removedRawMaterial])

        } catch (error) {
            console.error(error)
            alert("Failed to delete association.")
        }
    }

    return (
        <div className="new-product-container">
            <h1>Register Product</h1>

            {/* PRODUCT FORM */}
            <form onSubmit={handleCreateProduct} className="form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        placeholder="Product Value"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                {!productId && (
                    <div className="buttons">
                        <button type="submit" className="submit-button">Register</button>

                        <button type="button" className="cancel-button" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                    </div>
                )}
            </form>

            {/* ASSOCIATION SECTION */}
            {productId && (
                <div className="association-section">
                    <h2>Add Raw Materials</h2>

                    <div className="select-raw-materials">
                        <div className="inputs">
                            <select
                                className="selector"
                                value={selectedRawMaterials}
                                onChange={(e) => setSelectedRawMaterials(e.target.value)}
                            >
                                <option value="">Select Raw Material</option>
                                {rawMaterials.map((rm) => (
                                    <option key={rm.id} value={rm.id}>
                                        {rm.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                className="input-quantity"
                                type="number"
                                value={requiredQuantity}
                                onChange={(e) => setRequiredQuantity(e.target.value)}
                            />
                        </div>
                        <button className="add-button" onClick={handleAddAssociation}>Add</button>
                    </div>


                    <h3>Associated Raw Materials</h3>

                    {associations.map((assoc) => (
                        <div className="associated-raw-material-line">
                            <div
                                className="associated-raw-material"
                                key={assoc.id}
                            >
                                <p>{assoc.name}</p>

                                <p>{assoc.requiredQuantity} units</p>
                            </div>

                            <button
                                className="delete-association-button"
                                onClick={() => handleDeleteAssociation(assoc.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <button className="finish-button" onClick={() => navigate(-1)}>
                        Finish
                    </button>
                </div>
            )}
        </div>
    )
}