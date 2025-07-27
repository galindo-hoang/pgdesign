// src/components/ConsultationFormSection.tsx
import React, { useState, useRef, useCallback } from "react";
import "./ConsultationFormSection.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ConsultationFormSection: React.FC = () => {

  const formData = {
    title: "ĐĂNG KÝ TƯ VẤN",
    projectTypes: [
      "-- Chọn loại công trình --",
      "Nhà Phố - Căn hộ",
      "Nhà hàng - Khách sạn",
      "Quán Cafe",
      "Văn phòng",
      "Khác",
    ],
    minInvestment: 100,
    maxInvestment: 10000,
    stepInvestment: 100
  }

  const MIN_INVESTMENT = formData.minInvestment || 100; // 100 triệu VND
  const MAX_INVESTMENT = formData.maxInvestment || 10000; // 10 tỷ VND (which is 10,000 triệu VND)
  const STEP_INVESTMENT = formData.stepInvestment || 100; // Step of 100 triệu VND
  const projectTypes = formData.projectTypes || [
    "-- Chọn loại công trình --",
    "Nhà Phố - Căn hộ",
    "Nhà hàng - Khách sạn",
    "Quán Cafe",
    "Văn phòng",
    "Khác",
  ];

  const [stateFormData, setStateFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "", // Keep it as an empty string initially
    address: "",
    projectType: projectTypes[1],
    investmentLevel: MIN_INVESTMENT,
    specificRequest: "",
  });

  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  // NEW: State for email error
  const [emailError, setEmailError] = useState<string | null>(null);
  // NEW: State for address error
  const [addressError, setAddressError] = useState<string | null>(null);

  // State for showing tooltips on slider handles
  const [showTooltips, setShowTooltips] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Phone number validation function (unchanged)
  const validatePhoneNumber = (number: string): boolean => {
    const vnPhoneNumberRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$|^02\d{9}$/;

    if (!number) {
      setPhoneNumberError("*Số điện thoại không được để trống.");
      return false;
    }
    if (!vnPhoneNumberRegex.test(number)) {
      setPhoneNumberError("*Số điện thoại không hợp lệ.");
      return false;
    }
    setPhoneNumberError(null);
    return true;
  };

  // NEW: Email validation function
  const validateEmail = (email: string): boolean => {
    // A common regex for email validation. It's not 100% perfect for all edge cases
    // as email specs are very complex, but covers most common valid formats.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError("*Email không được để trống.");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("*Email không hợp lệ.");
      return false;
    }
    setEmailError(null);
    return true;
  };

  // NEW: Address validation function
  const validateAddress = (address: string): boolean => {
    if (!address || address.trim().length === 0) {
      setAddressError("*Địa chỉ không được để trống.");
      return false;
    }
    if (address.trim().length < 10) {
      setAddressError("*Địa chỉ phải có ít nhất 10 ký tự.");
      return false;
    }
    setAddressError(null);
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setStateFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "phoneNumber") {
      validatePhoneNumber(value);
    }
    // NEW: Validate email on change
    if (name === "email") {
      validateEmail(value);
    }
    // NEW: Validate address on change
    if (name === "address") {
      validateAddress(value);
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    if (typeof value === 'number') {
      setStateFormData((prevData) => ({
        ...prevData,
        investmentLevel: value,
      }));
    }
  };

  // Handle mouse enter/leave on slider for showing handle tooltips
  const handleSliderMouseEnter = useCallback(() => {
    setShowTooltips(true);
  }, []);

  const handleSliderMouseLeave = useCallback(() => {
    setShowTooltips(false);
  }, []);

  // Calculate tooltip positions based on slider values
  const getTooltipPosition = (value: number) => {
    const percentage = (value - MIN_INVESTMENT) / (MAX_INVESTMENT - MIN_INVESTMENT);
    return `${percentage * 100}%`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // NEW: Perform all validations before submitting
    const isPhoneNumberValid = validatePhoneNumber(stateFormData.phoneNumber);
    const isEmailValid = validateEmail(stateFormData.email);
    const isAddressValid = validateAddress(stateFormData.address); // Validate address
    const isProjectTypeSelected = !(
      stateFormData.projectType === "-- Chọn loại công trình --" ||
      stateFormData.projectType === ""
    );

    if (!isPhoneNumberValid || !isEmailValid || !isAddressValid || !isProjectTypeSelected) {
      alert("Vui lòng kiểm tra lại thông tin. Có lỗi trong biểu mẫu.");
      return;
    }

    const dataToSend = {
      ...stateFormData,
      investmentLevel: formatCurrencyDisplay(stateFormData.investmentLevel),
    };

    try {
      // Send data to backend API
      const response = await fetch('http://localhost:3002/api/v1/consultation/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(result.message || "Yêu cầu của bạn đã được gửi thành công!");
        
        // Reset form on successful submission
        setStateFormData({
          fullName: "",
          phoneNumber: "",
          email: "",
          address: "",
          projectType: projectTypes[1] || "Nhà Phố - Căn hộ",
          investmentLevel: MIN_INVESTMENT,
          specificRequest: "",
        });
        setPhoneNumberError(null);
        setEmailError(null);
        setAddressError(null);
      } else {
        alert(result.error?.message || "Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Không thể kết nối tới máy chủ. Vui lòng thử lại sau.");
    }
  };

  const formatCurrencyDisplay = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000} Tỷ`;
    }
    return `${value} Triệu`;
  };

  return (
    <section className="consultation-form-section">
      <h2 className="cf-main-headline">{formData.title}</h2>

      <form onSubmit={handleSubmit} className="cf-form-grid">
        <div className="cf-form-group">
          <label htmlFor="fullName">Họ và tên</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={stateFormData.fullName}
            onChange={handleChange}
            placeholder="Jane"
            required
          />
        </div>

        <div className="cf-form-group">
          <label htmlFor="phoneNumber">Số điện thoại</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={stateFormData.phoneNumber}
            onChange={handleChange}
            placeholder="0901234567"
            required
            className={phoneNumberError ? "input-error" : ""}
          />
          {phoneNumberError && (
            <p className="error-message">{phoneNumberError}</p>
          )}
        </div>

        <div className="cf-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={stateFormData.email}
            onChange={handleChange}
            placeholder="email@janesfakedomain.net"
            required
            className={emailError ? "input-error" : ""}
          />
          {/* NEW: Display email error message */}
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div className="cf-form-group">
          <label htmlFor="address">Địa chỉ</label>
          <input
            type="text"
            id="address"
            name="address"
            value={stateFormData.address}
            onChange={handleChange}
            placeholder="Số ..."
            required
            className={addressError ? "input-error" : ""}
          />
          {addressError && (
            <p className="error-message">{addressError}</p>
          )}
        </div>

        <div className="cf-form-group cf-project-type-group">
          <label htmlFor="projectType">Loại công trình</label>
          <select
            id="projectType"
            name="projectType"
            value={stateFormData.projectType}
            onChange={handleChange}
            required
            className={
              stateFormData.projectType === "-- Chọn loại công trình --"
                ? "placeholder-selected"
                : ""
            }
          >
            {projectTypes.map((type, index) => (
              <option
                key={index}
                value={type}
                disabled={index === 0 && type === "-- Chọn loại công trình --"}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="cf-form-group cf-investment-slider-group">
          <label>Mức đầu tư</label>
          <div className="cf-slider-display-text" style={{ display: 'none' }}>
            {formatCurrencyDisplay(stateFormData.investmentLevel)}
          </div>
          <div 
            ref={sliderRef}
            className="cf-slider-container"
            onMouseEnter={handleSliderMouseEnter}
            onMouseLeave={handleSliderMouseLeave}
          >
            <Slider
              min={MIN_INVESTMENT}
              max={MAX_INVESTMENT}
              step={STEP_INVESTMENT}
              value={stateFormData.investmentLevel}
              onChange={handleSliderChange}
              trackStyle={{ backgroundColor: "#557256" }}
              handleStyle={{
                borderColor: "#557256",
                backgroundColor: "#557256",
                opacity: 1,
              }}
              railStyle={{ backgroundColor: "#e0e0e0" }}
            />
            {/* Handle tooltip positioned above slider handle */}
            {showTooltips && (
              <div className="cf-slider-tooltips">
                <div 
                  className="cf-handle-tooltip"
                  style={{
                    left: getTooltipPosition(stateFormData.investmentLevel)
                  }}
                >
                  {formatCurrencyDisplay(stateFormData.investmentLevel)}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="cf-form-group cf-full-width">
          <label htmlFor="specificRequest">Yêu cầu cụ thể</label>
          <textarea
            id="specificRequest"
            name="specificRequest"
            value={stateFormData.specificRequest}
            onChange={handleChange}
            rows={5}
          ></textarea>
        </div>

        <div className="cf-full-width cf-submit-button-container">
          <button type="submit" className="cf-submit-button">
            Gửi yêu cầu
          </button>
        </div>
      </form>
    </section>
  );
};

export default ConsultationFormSection;
