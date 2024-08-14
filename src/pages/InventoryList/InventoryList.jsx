import React, { useEffect, useState } from "react";
import styles from "./InventoryList.module.css";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [selectedItemDescription, setSelectedItemDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getItems = () => {
    fetch(`http://localhost:5000/api/inventory`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "success") alert(data.message);
        else setItems(data.items);
        console.log(data.items);
      });
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleShowDescription = (description) => {
    setSelectedItemDescription(description);
    setShowModal(true);
  };

  return (
    <div className={styles.inventoryContainer}>
      <div className={styles.inventoryList}>
        <h2>Inventory Items</h2>
        <ul className={styles.itemList}>
          {items?.map((item) => (
            <li key={item._id} className={styles.inventoryItem}>
              <div className={styles.itemName}>{item.name}</div>
              <div className={styles.itemDetails}>
                <p>Quantity: {item.quantity}</p>
                {item.__t === "MechanicalPart" && (
                  <div className={styles.itemTypeDetails}>
                    <p>Category: {item.__t}</p>
                    <p>Material: {item.material}</p>
                    <p>Dimensions: {item.dimensions}</p>
                    <p>Weight: {item.weight}</p>
                  </div>
                )}
                {item.__t === "RawMaterial" && (
                  <div className={styles.itemTypeDetails}>
                    <p>Category: {item.__t}</p>
                    <p>Type: {item.type}</p>
                    <p>Purity: {item.purity}</p>
                  </div>
                )}
                {item.__t === "ElectricalPart" && (
                  <div className={styles.itemTypeDetails}>
                    <p>Category: {item.__t}</p>
                    <p>Voltage: {item.voltage}</p>
                    <p>Current: {item.current}</p>
                    <p>Power Rating: {item.powerRating}</p>
                  </div>
                )}
                {item.__t !== "ElectricalPart" &&
                  item.__t !== "RawMaterial" &&
                  item.__t !== "MechanicalPart" && (
                    <div className={styles.itemTypeDetails}>
                      <p>Category: Normal Item</p>
                    </div>
                  )}
              </div>
              <button
                className={styles.descriptionButton}
                onClick={() => handleShowDescription(item.description)}
              >
                Show Description
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {selectedItemDescription}
      </Modal>
    </div>
  );
};

export default InventoryList;
