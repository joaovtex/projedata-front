import './index.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById, updateProduct } from '../../api/productService'
import { getRawMaterials } from '../../api/rawMaterialService'
import {
    getProductRawMaterialsByProductId,
    createProductRawMaterial,
    deleteProductRawMaterial
} from '../../api/productRawMaterialService'

export default function EditProduct() {
    const navigate = useNavigate()
    const { id } = useParams()

    const [name, setName] = useState("")
    const [value, setValue] = useState(0)
    const [productId, setProductId] = useState(null)

    const [rawMaterials, setRawMaterials] = useState([])
    const [selectedRawMaterials, setSelectedRawMaterials] = useState("")
    const [requiredQuantity, setRequiredQuantity] = useState(0)
    const [associations, setAssociations] = useState([])

    useEffect(() => {
        loadProduct()
    }, [])

    const loadProduct = async () => {
        try {
            const productResponse = await getProductById(id)
            const product = productResponse.data

            setName(product.name)
            setValue(product.value)
            setProductId(product.id)

            const rawMaterialResponse = await getRawMaterials()
            const allRawMaterials = rawMaterialResponse.data

            const associationResponse = await getProductRawMaterialsByProductId(id)
            const associationsFromBackend = associationResponse.data

            const formattedAssociations = associationsFromBackend.map((assoc) => ({
                id: assoc.id,
                rawMaterialId: assoc.rawMaterial.id,
                name: assoc.rawMaterial.name,
                requiredQuantity: assoc.requiredQuantity
            }))

            setAssociations(formattedAssociations)

            const associatedIds = formattedAssociations.map(a => a.rawMaterialId)

            const availableRawMaterials = allRawMaterials.filter(
                (rm) => !associatedIds.includes(rm.id)
            )

            setRawMaterials(availableRawMaterials)

        } catch (error) {
            console.error(error)
            alert("Failed to load product data.")
        }
    }

    const handleUpdateProduct = async (e) => {
        e.preventDefault()

        try {
            await updateProduct(productId, {
                name,
                value: Number(value)
            })

            alert("Product updated successfully.")
        } catch (error) {
            console.error(error)

            const apiMessage = error.response?.data?.message
            alert(apiMessage || "Failed to update product.")
        }
    }

    const handleAddAssociation = async () => {

        if (!selectedRawMaterials) {
            alert("Please select a raw material.")
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

            const newAssociation = {
                id: response.data.id,
                rawMaterialId: selectedRawMaterial.id,
                name: selectedRawMaterial.name,
                requiredQuantity
            }

            setAssociations([...associations, newAssociation])

            setRawMaterials(
                rawMaterials.filter(rm => rm.id !== selectedRawMaterial.id)
            )

            setSelectedRawMaterials("")
            setRequiredQuantity(0)

        } catch (error) {
            const apiMessage = error.response?.data?.message
            alert(apiMessage || "Failed to add association.")
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

            setRawMaterials([
                ...rawMaterials,
                {
                    id: associationToRemove.rawMaterialId,
                    name: associationToRemove.name
                }
            ])

        } catch (error) {
            alert("Failed to delete association.")
        }
    }

    return (
        <div className="new-product-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>

            <h1>Edit Product</h1>

            <form onSubmit={handleUpdateProduct} className="form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <div className="buttons">
                    <button type="submit" className="submit-button">
                        Save Changes
                    </button>
                </div>
            </form>

            <div className="association-section">
                <h2>Add Raw Materials</h2>

                <div className="select-raw-materials">
                    <div className="inputs">
                        <select
                            className="selector-raw-materials"
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

                    <button className="add-button" onClick={handleAddAssociation}>
                        Add
                    </button>
                </div>

                <h3>Associated Raw Materials</h3>

                {associations.map((assoc) => (
                    <div key={assoc.id} className="associated-raw-material-line">
                        <div className="associated-raw-material">
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
            </div>
        </div>
    )
}
