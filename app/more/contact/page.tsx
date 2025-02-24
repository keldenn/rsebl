"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";



export default function ContactUs() {

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
    if (!formData.full_name || !formData.email || !formData.phone_number || !formData.message) {
      //setErrorMessage("All fields are required.");
      toast({
        description: "All fields are required.",
        variant: "destructive",
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
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submitFeedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone_number: Number(formData.phone_number),
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "200") {
        //setSuccessMessage("Feedback submitted successfully.");
        toast({
          description: "Feedback submitted successfully."
        });
        setFormData({ full_name: "", email: "", phone_number: "", message: "" });
      } else {
        //setErrorMessage("Failed to submit feedback. Please try again.");
        toast({
          description: "Failed to submit feedback. Please try again.",
          variant: "destructive",
        });
        
      }
    } catch (error) {
      //setErrorMessage("Error submitting feedback. Please check your connection.");
      toast({
        description: "Error submitting feedback. Please check your connection.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-5 w-full">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-4">
        {/* Contact Us Form */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
            <p className="text-sm">We would love to hear from you! Fill out the form below to get in touch.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.full_name}
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
                <label htmlFor="phone_number" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="number"
                  placeholder="Enter your phone number"
                  value={formData.phone_number}
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
              {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} onClick={handleSubmit} className="text-sm font-semibold w-full md:w-auto">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>

        {/* Dynamically Rendered Contact Cards */}
        {isLoading ? (
          <p className="text-center col-span-3">Loading...</p>
        ) : (
          contactDetails.map((detail) => (
            <Card key={detail.id} className="w-full">
              <CardHeader>
                <CardTitle className="text-lg font-bold">{detail.title}</CardTitle>
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
