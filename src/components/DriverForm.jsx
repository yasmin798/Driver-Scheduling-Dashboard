import React, { useState } from "react";
import "./DriverForm.css";

const DriverForm = ({ onAddDriver }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    license: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.license.trim()) {
      newErrors.license = "License number is required";
    } else if (formData.license.length < 6) {
      newErrors.license = "License number is too short";
    }

    if (formData.phone.trim()) {
      const cleanPhone = formData.phone.replace(/\D/g, ""); // Remove all non-digits
      if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        newErrors.phone = "Phone number should be 10-15 digits";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onAddDriver(formData);
    setFormData({ name: "", email: "", phone: "", license: "" });
    setErrors({});
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="driver-form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Add New Driver</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
                placeholder="Enter driver's full name"
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="driver@company.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="license">Driver's License</label>
              <input
                type="text"
                id="license"
                name="license"
                value={formData.license}
                onChange={handleChange}
                className={errors.license ? "error" : ""}
                placeholder="DL123456789"
              />
              {errors.license && (
                <span className="error-message">{errors.license}</span>
              )}
            </div>
          </div>

          <div className="form-footer">
            <button
              type="submit"
              className={`add-btn ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Adding Driver...
                </>
              ) : (
                "Add Driver"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DriverForm;
