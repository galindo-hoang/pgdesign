import React from "react";
import "./ServicePage.css";
import ServicesSection from "../../components/ServicesSection";
import ConstructionServicesSection from "../../components/ConstructionServicesSection";
import ServiceProcessSection from "../../components/ServiceProcessSection";

const ServicePage: React.FC = () => {
  return (
    <div className="service-page">
      <ServicesSection />
      <ServiceProcessSection 
        processNumber={1}
        title="THI CÔNG PHẦN THÔ HOẶC TRỌN GÓI HOÀN THIỆN"
        description="PG Design đảm nhận toàn bộ quy trình xây dựng từ phần thô đến hoàn thiện công trình — bao gồm thi công móng, kết cấu, xây tô, ốp lát, sơn nước, lắp đặt thiết bị vệ sinh, hệ thống điện - nước và trần đến hoàn chỉnh."
        note="Không bao gồm thi công đồ nội thất rời - xem mục Thi công nội thất"
      />
      <ConstructionServicesSection 
        titleLeft = "THI CÔNG PHẦN THÔ"
        contentsLeft = {["Đào móng, thi công móng - thi công bể tự hoại", "Thi công hệ khung bê tông cột thép: cột, dầm, sàn, cầu thang", "Thi công tường bao che, tường ngăn nhà", "Lắp đặt hệ thống điện, nước âm tường, sàn", "Thi công chống thấm, cán nền sàn, tô tường"]}
        titleRight = "TRỌN GÓI HOÀN THIỆN"
        contentsRight = {["Lát gạch nền, tường, khu vực vệ sinh","Sơn nước trong - ngoài nhà","Lắp trần thạch cao, trang trí phào chỉ (nếu có)","Lắp thiết bị vệ sinh","Lắp hệ thống điện nổi, đèn chiếu sáng","Lắp đặt cửa chính, cửa sổ, lan can"]}
      />
      <ServiceProcessSection 
        processNumber={2}
        title="THI CÔNG NỘI THẤT"
        description="PG Design đồng hành cùng bạn từ khâu hoàn thiện công trình, thi công nội thất đến cải tạo lại toàn bộ không gian sống - mang đến sự chỉn chu, tiện nghi và cảm xúc sống trọn vẹn."
        note=""
      />
      <ConstructionServicesSection 
        titleLeft = "THI CÔNG HOÀN THIỆN"
        contentsLeft = {["Ốp lát gạch nền, tường WC, bếp, ban công", "Sơn nước hoàn thiện trong - ngoài", "Thi công trần thạch cao, phào chỉ (nếu có)","Lắp thiết bị điện, đèn chiếu sáng","Lắp đặt thiết bị vệ sinh","Vệ sinh tổng thể trước khi bàn giao"]}
        titleRight = "THI CÔNG NỘI THẤT"
        contentsRight = {["Gia công, sản xuất và lắp đặt nội thất theo bản vẽ thiết kế","Trình mẫu vật tư và nghiệm thu vật liệu đầu vào trước khi sản xuất","Vật liệu nội thất từ gỗ công nghiệp (An Cường,...) gỗ tự nhiên (gỗ óc chó...) hoặc gỗ nhựa (Picomat, WPB...)","Cung cấp lắp đặt phụ kiện tủ từ cơ bản tới cao cấp","Cung cấp và lắp đặt thiết bị bếp (máy rửa chén, bếp từ, lò vi sóng...)","Cung cấp và lắp đặt thiết bị thông minh (nếu có)","Nhận thi công nội thất từ thiết kế của khách hàng"]}
      />
      <ServiceProcessSection 
        processNumber={3}
        title="THIẾT KẾ KIẾN TRÚC & NỘI THẤT"
        description="Từ khái niệm không gian đến bản vẽ chi tiết, PG Design kiến tạo nên những thiết kế vừa chuẩn công năng, vừa đậm chất thẩm mỹ - thể hiện rõ cá tính và phong cách sống của gia chủ trong từng đường nét."
        note=""
      />
      <ConstructionServicesSection 
        titleLeft = "THIẾT KẾ KIẾN TRÚC"
        contentsLeft = {["Bản vẽ cơ sở kiến trúc","Phối cảnh thiết kế hoàn chỉnh","Bộ hồ sơ kiến trúc chi tiết","Bộ hồ sơ kết cấu","Hồ sơ kỹ thuật điện - nước"]}
        titleRight = "THIẾT KẾ NỘI THẤT"
        contentsRight = {["Định hướng không gian tổng thể","Phối cảnh nội thất hoàn chỉnh","Mặt bằng & chi tiết kỹ thuật","Thiết kế chi tiết tiện ích phụ","Hồ sơ kỹ thuật điện - công nghệ"]}
      />
      <ServiceProcessSection 
        processNumber={4}
        title="CẢI TẠO SỬA CHỮA HOẶC DỰ ÁN ĐÃ CÓ BẢN VẼ"
        description="PG Design nhận thi công các công trình đã có bản vẽ kiến trúc hoặc nội thất, đảm bảo đúng kỹ thuật - đúng thiết kế - đúng tiến độ, mang đến sản phẩm cuối cùng hoàn thiện với chất lượng chuẩn mực."
        note=""
      />
      <ConstructionServicesSection 
        titleLeft = "CẢI TẠO SỬA CHỮA"
        contentsLeft = {["Khảo sát thực tế hiện trạng công trình","Đánh giá kết cấu, hệ thống điện nước, vật liệu, công năng", "Đề xuất phương án cải tạo phù hợp nhu cầu - thẩm mỹ - ngân sách","Lập hồ sơ thiết kế cải tạo và dự toán công trình","Thi công từ phần thô đến hoàn thiện","Đảm bảo tiến độ, giám sát kỹ thuật và an toàn công trình trong suốt quá trình thi công"]}
        titleRight = "DỰ ÁN ĐÃ CÓ BẢN VẼ"
        contentsRight = {["Tiếp nhận, rà soát và phân tích bản vẽ thiết kế","Tư vấn vật tư, phương án thi công phù hợp thực tế","Bóc tách khối lượng - lập báo giá chi tiết","Trình mẫu vật tư trước khi thi công","Triển khai thi công theo đúng hồ sơ thiết kế","Nghiệm thu từng phần & tổng thể công trình với CĐT trước khi bản giao","Giám sát chặt chẽ - bảo hành công trình sau hoàn thiện"]}
      />
    </div>
  );
};

export default ServicePage;
