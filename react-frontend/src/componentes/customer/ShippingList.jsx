import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import admin_loader from "../../assets/images/admin_loader.gif";

function ShippingList({shipping, handleEditShippingAddress , handleDeleteShippingAddress,selectedAddress, onSelectAddress}) {    
    return (
        <>
            {!shipping.length > 0 ?
                <tr>
                    <td style={{ textAlign: "center", padding: "20px" }} colSpan={9}>
                        <img
                            src={admin_loader}
                            alt="Loading..."
                            width="60"
                        />
                    </td>
                </tr>
                : shipping.map((ship) => (
                <tr key={ship.id} className={selectedAddress?.id === ship.id ? "table-active" : ""}>
                    <td><input type="radio" value={ship.id} name="shipping_address" checked={selectedAddress?.id === ship.id} onChange={() =>onSelectAddress(ship)}/></td>
                    <td>{ship.first_name}</td>
                    <td>{ship.last_name}</td>
                    <td>{ship.address}</td>
                    <td>{ship.address_2}</td>
                    <td>{ship.city}</td>
                    <td>{ship.province}</td>
                    <td>{ship.postal_code}</td>
                    <td className="text-center">
                        <button className="btn btn-info btn-sm" onClick={() => handleEditShippingAddress(ship)}><FontAwesomeIcon icon={faPencilAlt}/></button>                        
                    </td>
                    <td className="text-center">                        
                        <button className="btn btn-danger btn-sm" onClick={() =>handleDeleteShippingAddress(ship.id)}><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                </tr>
                
            ))}
             
        </>
    )
}

export default ShippingList;