import React, { useState } from "react";
import styles from "./InventoryForm.module.css";

const InventoryForm = () => {
  const [itemType, setItemType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    material: "",
    dimensions: "",
    weight: "",
    type: "",
    purity: "",
    voltage: "",
    current: "",
    powerRating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (itemType == "") {
      alert("please select item type");
      return;
    }
    const url = `http://localhost:5000/api/inventory/${itemType.toLowerCase()}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      alert("item added sucessfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles.inventoryContainer}>
      <div className={styles.inventoryForm}>
        <h2>Add Inventory Item</h2>
        <form onSubmit={handleSubmit} className={styles.innerForm}>
          <div>
            <label htmlFor="itemType">Item Type:</label>
            <select
              id="itemType"
              name="itemType"
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
              className={styles.inputField}
            >
              <option value="">Select Item Type</option>
              <option value="add">General Inventory Item</option>
              <option value="mechanical">Mechanical Part</option>
              <option value="rawmaterial">Raw Material</option>
              <option value="electrical">Electrical Part</option>
            </select>
          </div>

          {itemType && (
            <>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>

              <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>
            </>
          )}

          {itemType === "mechanical" && (
            <>
              <div>
                <label htmlFor="material">Material:</label>
                <input
                  id="material"
                  name="material"
                  type="text"
                  value={formData.material}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>

              <div>
                <label htmlFor="dimensions">Dimensions:</label>
                <input
                  id="dimensions"
                  name="dimensions"
                  type="text"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>

              <div>
                <label htmlFor="weight">Weight:</label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>
            </>
          )}

          {itemType === "rawmaterial" && (
            <>
              <div>
                <label htmlFor="type">Type:</label>
                <input
                  id="type"
                  name="type"
                  type="text"
                  value={formData.type}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>

              <div>
                <label htmlFor="purity">Purity:</label>
                <input
                  id="purity"
                  name="purity"
                  type="text"
                  value={formData.purity}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>
            </>
          )}

          {itemType === "electrical" && (
            <>
              <div>
                <label htmlFor="voltage">Voltage:</label>
                <input
                  id="voltage"
                  name="voltage"
                  type="number"
                  value={formData.voltage}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>

              <div>
                <label htmlFor="current">Current:</label>
                <input
                  id="current"
                  name="current"
                  type="number"
                  value={formData.current}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>

              <div>
                <label htmlFor="powerRating">Power Rating:</label>
                <input
                  id="powerRating"
                  name="powerRating"
                  type="number"
                  value={formData.powerRating}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className={styles.submitButton}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;
