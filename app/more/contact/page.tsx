"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [contactDetails, setContactDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fetch-contact-details`);
        if (!response.ok) {
          throw new Error("Failed to fetch contact details.");
        }
        const data = await response.json();
        setContactDetails(data);
      } catch (error) {
        console.error("Error fetching contact details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert({
        title: "Error",
        description: "All fields are required.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulating form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert({
        title: "Success",
        description: "Thank you for reaching out! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      alert({
        title: "Error",
        description: "Form submission failed. Please try again later.",
      });
      console.error("Form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-5 w-full">
      <div className="grid grid-cols-3 gap-4">
        {/* Contact Us Form */}
        <Card className="col-span-2 row-span-2">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold ">Contact Us</CardTitle>
            <p className="text-sm ">We would love to hear from you! Fill out the form below to get in touch.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="text-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="text-sm h-32"
                />
              </div>

              {successMessage && <p className="text-green-500 text-center text-sm">{successMessage}</p>}
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isSubmitting} className="text-sm font-semibold">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>

        {/* Dynamically Rendered Contact Cards */}
        {isLoading ? (
          <p className="text-center col-span-3">Loading...</p>
        ) : (
          contactDetails.map((detail) => (
            <Card key={detail.id}>
              <CardHeader>
                <CardTitle className="text-lg font-bold ">{detail.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div dangerouslySetInnerHTML={{ __html: detail.content }} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
