import React, { useState } from 'react';
import { Gift, Clock, Users, Mail, User, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';

function WaitList() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/wait-list/api/join/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          comment: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setResponseMessage(data.message);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        alert(data.error || data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Could not submit form. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-48 h-48 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-300"></div>
      <div className="absolute -bottom-8 left-1/2 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-700"></div>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-8 shadow-2xl">
            <Users className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Content */}
          <div className="space-y-12">
            {/* Description */}
            <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
              <p className="text-lg md:text-xl text-white leading-relaxed font-light">
                Our platform is currently in active development, and we value your perspective. Join the waitlist to share your feedback, suggest features, and help shape the future of the platform.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Benefits</h2>
              
              <div className="space-y-4">
                <div className="group backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">🎁 One Month of Premium Access</h3>
                      <p className="text-white/80 text-base">Complimentary for early members.</p>
                    </div>
                  </div>
                </div>

                <div className="group backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">⏳ Limited Availability</h3>
                      <p className="text-white/80 text-base">Secure your place before spots are filled.</p>
                    </div>
                  </div>
                </div>

                <div className="group backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl hover:bg-white/15 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">🙌 Early Influence</h3>
                      <p className="text-white/80 text-base">Help guide the development of features that matter most to you.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:sticky lg:top-8">
            <div className="backdrop-blur-lg bg-white/15 rounded-3xl p-8 border border-white/30 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">Join Now</h2>
              
              {isSubmitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
                  <div className="flex items-center space-x-3 text-green-100">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{responseMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 group-hover:bg-white/15"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 group-hover:bg-white/15"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-semibold text-white/90 mb-2">
                    Message (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-white/60" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 resize-none group-hover:bg-white/15"
                      placeholder="Tell us about your healthcare needs or what features you'd like to see..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-400/50"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <span className="text-base">Reserve My Spot</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/20 text-center">
                <p className="text-sm text-white/70">
                  By joining, you agree to receive updates about our platform.
                  <br />
                  <span className="text-white/90 font-medium">We respect your privacy and won't spam you.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitList;