import { Outlet } from "react-router-dom";

const LandlordLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      
      {/* SIDEBAR */}
      <aside
        style={{
          width: "230px",
          minHeight: "100vh",
          background: "#1E293B",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Landlord</h2>

        <p>My Listings</p>
        <p>Add Listing</p>
      </aside>

      {/* CONTENT */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default LandlordLayout;