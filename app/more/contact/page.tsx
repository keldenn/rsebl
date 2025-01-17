"use client"
import { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        alert({
            title: "Error",
            description: "All fields are required.",
          })
    
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
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
      })
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {

      alert({
        title: "Error",
        description: "Form submission failed. Please try again later.",
      })
      console.error("Form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-5 w-full">
            <div className="  grid grid-cols-3  gap-4">
                {/* FORM */}
            <Card className="col-span-2 row-span-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold ">Contact Us</CardTitle>
          <p className="text-sm ">We would love to hear from you! Fill out the form below to get in touch.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium  mb-1">
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
              <label htmlFor="email" className="block text-sm font-medium  mb-1">
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
              <label htmlFor="phone" className="block text-sm font-medium  mb-1">
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
              <label htmlFor="message" className="block text-sm font-medium  mb-1">
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




<Card>
  <CardHeader>
    <CardTitle className="text-lg font-bold ">Customer Service</CardTitle>
  </CardHeader>
  <CardContent>
    <p><span className="font-semibold">Phone:</span> +975-02-323849</p>
    <p>
      <span className="font-semibold">Email:</span> <a href="mailto:rseb@rsebl.org.bt" className="text-blue-600">rseb@rsebl.org.bt</a>
    </p>
    <p><span className="font-semibold">Address:</span> RICBL Building, Top Floor, Norzin Lam, 11001, Thimphu</p>
  </CardContent>
</Card>

<Card>
  <CardHeader>
    <CardTitle className="text-lg font-semibold">Regulatory, Policies & Products</CardTitle>
  </CardHeader>
  <CardContent>
    <p><span className="font-semibold">Focal Person:</span> Dawa Drakpa</p>
    <p>
      <span className="font-semibold">Email:</span> <a href="mailto:dawa@rsebl.org.bt" className="text-blue-600">dawa@rsebl.org.bt</a>
    </p>
    <p><span className="font-semibold">Focal Person:</span> Dechen Pelden</p>
    <p>
      <span className="font-semibold">Email:</span> <a href="mailto:yeshi.lhamo@rsebl.org.bt" className="text-blue-600">dechen.pelden@rsebl.org.bt</a>
    </p>
  </CardContent>
</Card>

<Card>
  <CardHeader>
    <CardTitle className="text-lg font-semibold">Share Statement, Information Updation & Others</CardTitle>
  </CardHeader>
  <CardContent>
    <p><span className="font-semibold">Focal Person:</span> Dorji Zangmo</p>
    <p>
      <span className="font-semibold">Email:</span> <a href="mailto:dorji.zangmo@rsebl.org.bt" className="text-blue-600">dorji.zangmo@rsebl.org.bt</a>
    </p>
  </CardContent>
</Card>

<Card>
  <CardHeader>
    <CardTitle className="text-lg font-semibold">Depository Services</CardTitle>
  </CardHeader>
  <CardContent>
    <p><span className="font-semibold">Focal Person:</span> Ngawang Lhendup</p>
    <p>
      <span className="font-semibold">Email:</span> <a href="mailto:lhendup@rsebl.org.bt" className="text-blue-600">lhendup@rsebl.org.bt</a>
    </p>
  </CardContent>
</Card>


            <Card>
            <CardHeader>
                <CardTitle className="text-lg font-semibold">Clearing & Settlement House</CardTitle>
            </CardHeader>
            <CardContent>
                <p><span className="font-semibold">Focal Person:</span> Khandu Wangmo</p>
                <p>
                <span className="font-semibold">Email:</span> <a href="mailto:khanduwang@rsebl.org.bt" className="text-blue-600">khanduwang@rsebl.org.bt</a>
                </p>
            </CardContent>
            </Card>


         
            
          </div>

     
  
    </div>
  );
}
