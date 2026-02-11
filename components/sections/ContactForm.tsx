"use client";
import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Section3D from "../3d/Section3D";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "Sending...", type: "" });

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: process.env.NEXT_PUBLIC_EMAILJS_RECEIVER_EMAIL,
        },
        publicKey,
      );

      setStatus({ message: "Message sent successfully!", type: "success" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        message: "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus({ message: "", type: "" }), 5000);
    }
  };

  return (
    <Section3D id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.formSide}>
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>Have a project in mind? Let's talk.</p>

          <div style={{ position: "relative", minHeight: "350px" }}>
            <AnimatePresence mode="wait">
              {status.type === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "backOut" }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                    }}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      background: "#c0ff00",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                      boxShadow: "0 0 20px rgba(192, 255, 0, 0.4)",
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#000"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path
                        d="M20 6L9 17l-5-5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      />
                    </svg>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className={styles.title}
                    style={{ fontSize: "2rem", marginBottom: "0.5rem" }}
                  >
                    Message Sent!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className={styles.subtitle}
                  >
                    Thanks for reaching out. I'll get back to you soon.
                  </motion.p>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    onClick={() => setStatus({ message: "", type: "" })}
                    style={{
                      marginTop: "1rem",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.7)",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  className={styles.form}
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    suppressHydrationWarning
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    suppressHydrationWarning
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={styles.textarea}
                  />
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    suppressHydrationWarning
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.8 : 1,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.loader}></span>
                        <span>Sending...</span>
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                  {status.message && status.type === "error" && (
                    <p
                      style={{
                        marginTop: "1rem",
                        color: "#ff4d4d",
                        fontSize: "0.9rem",
                      }}
                    >
                      {status.message}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section3D>
  );
};

export default ContactForm;
