import { useNavigate } from "react-router-dom";
import styles from "./Homepage.module.css";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

function HomePage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <div className={styles.home_container}>
      <div className={styles.welcome_container}>
        <h1 className={styles.welcome_text}>Welcome to Your Inventory</h1>
        <p className={styles.welcome_subtext}>
          Manage your items with ease and keep track of your inventory.
        </p>
      </div>
      <div className={styles.options_container}>
        <button
          className={styles.option_button}
          onClick={() => {
            if (isLoggedIn) navigate("/inventoryform");
            else alert("You must sign in first to add items to your profile");
          }}
        >
          Add Item
        </button>
        <button
          className={styles.option_button}
          onClick={() => {
            if (isLoggedIn) navigate("/InventoryList");
            else alert("You must sign in first to view your current items");
          }}
        >
          View Your Items
        </button>
      </div>
    </div>
  );
}

export default HomePage;
