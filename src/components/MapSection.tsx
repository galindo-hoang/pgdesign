// src/components/MapSection/MapSection.tsx
import React from "react";
import "./MapSection.css"; // Create this CSS file next

const MapSection: React.FC = () => {
  // Replace with your actual Google Maps embed URL
  // You can get this from Google Maps:
  // 1. Go to Google Maps (maps.google.com)
  // 2. Search for your business/location (e.g., "77 Đ. Số 5, Khu đô thị Vạn Phúc, Thủ Đức, Hồ Chí Minh")
  // 3. Click "Share" -> "Embed a map"
  // 4. Copy the src URL from the iframe code
  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1845.1786228184558!2d106.71177295526046!3d10.841341425138305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529cf4f51dcef%3A0xb6acb445e63ab5d4!2zQ8O0bmcgVHkgVE5ISCBLaeG6v24gVHLDumMgWMOieSBE4buxbmcgTuG7mWkgVGjhuqV0IFBH!5e0!3m2!1sen!2s!4v1750020130529!5m2!1sen!2s";

  return (
    <section className="pg-map-section">
      <div className="pg-map-content-wrapper"></div>
      <div className="pg-map-embed">
        <iframe
          src={googleMapsEmbedUrl}
          width="100%"
          height="450" // Adjust height as needed
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Company Location on Google Maps"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
