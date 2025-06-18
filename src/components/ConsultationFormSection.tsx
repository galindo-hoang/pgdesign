// src/components/ConsultationFormSection.tsx
import React, { useState } from "react";
import "./ConsultationFormSection.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const projectTypes = [
  "-- Chọn loại công trình --",
  "Nhà Phố - Căn hộ",
  "Nhà hàng - Khách sạn",
  "Quán Cafe",
  "Văn phòng",
];

const MIN_INVESTMENT = 100; // 100 triệu VND
const MAX_INVESTMENT = 1000; // 10 tỷ VND (which is 10,000 triệu VND)
const STEP_INVESTMENT = 100; // Step of 100 triệu VND

const ConsultationFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "", // Keep it as an empty string initially
    address: "",
    projectType: "Nhà Phố - Căn hộ",
    investmentLevel: [MIN_INVESTMENT, MAX_INVESTMENT] as [number, number],
    specificRequest: "",
  });

  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
  // NEW: State for email error
  const [emailError, setEmailError] = useState<string | null>(null);

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
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
  };

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setFormData((prevData) => ({
        ...prevData,
        investmentLevel: value as [number, number],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // NEW: Perform all validations before submitting
    const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);
    const isEmailValid = validateEmail(formData.email); // Validate email
    const isProjectTypeSelected = !(
      formData.projectType === "-- Chọn loại công trình --" ||
      formData.projectType === ""
    );

    if (!isPhoneNumberValid || !isEmailValid || !isProjectTypeSelected) {
      // Add email validation
      alert("Vui lòng kiểm tra lại thông tin. Có lỗi trong biểu mẫu.");
      return;
    }

    const dataToSend = {
      ...formData,
      investmentLevel: `${formatCurrencyDisplay(
        formData.investmentLevel[0]
      )} - ${formatCurrencyDisplay(formData.investmentLevel[1])}`,
    };
    console.log("Form data submitted:", dataToSend);
    alert("Yêu cầu của bạn đã được gửi thành công!");
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "", // Reset email
      address: "",
      projectType: "Nhà Phố - Căn hộ",
      investmentLevel: [MIN_INVESTMENT, MAX_INVESTMENT],
      specificRequest: "",
    });
    setPhoneNumberError(null);
    setEmailError(null); // Clear email error on successful submission
  };

  const formatCurrencyDisplay = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000} Tỷ`;
    }
    return `${value} Triệu`;
  };

  return (
    <section className="consultation-form-section">
      <h2 className="cf-main-headline">ĐĂNG KÝ TƯ VẤN</h2>

      <form onSubmit={handleSubmit} className="cf-form-grid">
        <div className="cf-form-group">
          <label htmlFor="fullName">Họ và tên</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
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
            value={formData.phoneNumber}
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
            value={formData.email}
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
            value={formData.address}
            onChange={handleChange}
            placeholder="Số ..."
          />
        </div>

        <div className="cf-form-group cf-project-type-group">
          <label htmlFor="projectType">Loại công trình</label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            required
            className={
              formData.projectType === "-- Chọn loại công trình --"
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
          <div className="cf-slider-display-text">
            {formatCurrencyDisplay(formData.investmentLevel[0])} -{" "}
            {formatCurrencyDisplay(formData.investmentLevel[1])}
          </div>
          <Slider
            range
            min={MIN_INVESTMENT}
            max={MAX_INVESTMENT}
            step={STEP_INVESTMENT}
            value={formData.investmentLevel}
            onChange={handleSliderChange}
            trackStyle={[{ backgroundColor: "#557256" }]}
            handleStyle={[
              {
                borderColor: "#557256",
                backgroundColor: "#557256",
                opacity: 1,
              },
              {
                borderColor: "#557256",
                backgroundColor: "#557256",
                opacity: 1,
              },
            ]}
            railStyle={{ backgroundColor: "#e0e0e0" }}
          />
        </div>

        <div className="cf-form-group cf-full-width">
          <label htmlFor="specificRequest">Yêu cầu cụ thể</label>
          <textarea
            id="specificRequest"
            name="specificRequest"
            value={formData.specificRequest}
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
