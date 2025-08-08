import React from 'react';
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="py-16 bg-background">
      <div className="genz-container">
        <motion.div
          className="space-y-12"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Header Section */}
          <motion.div variants={fadeIn} className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-genz-gradient bg-clip-text text-transparent">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Please read these terms carefully before using our platform.
            </p>
          </motion.div>

          {/* Tabs for Different Sections */}
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="general">General Terms</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="payments">Payment Terms</TabsTrigger>
              <TabsTrigger value="disclaimers">Disclaimers</TabsTrigger>
            </TabsList>
            
            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <TabsContent value="general" className="space-y-6">
                  <h2 className="text-2xl font-semibold">General Terms and Conditions</h2>
                  
                  <div className="space-y-6">
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">1. Acceptance of Terms</h3>
                      <p className="text-muted-foreground">
                        By accessing or using GenZ Health AI Doctor ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">2. Description of Service</h3>
                      <p className="text-muted-foreground">
                        GenZ Health AI Doctor provides AI-powered health analysis, symptom checking, medical image analysis, and related health services. The Service is not a replacement for professional medical advice, diagnosis, or treatment.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">3. User Accounts</h3>
                      <p className="text-muted-foreground">
                        When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">4. Intellectual Property</h3>
                      <p className="text-muted-foreground">
                        The Service and its original content, features, and functionality are and will remain the exclusive property of GenZ Health AI Doctor and its licensors. The Service is protected by copyright, trademark, and other laws.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">5. User Content</h3>
                      <p className="text-muted-foreground">
                        By submitting content to the Service, you grant us the right to use, reproduce, modify, adapt, publish, and display such content in connection with providing the Service.
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="privacy" className="space-y-6">
                  <h2 className="text-2xl font-semibold">Privacy Policy</h2>
                  
                  <div className="space-y-6">
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">1. Data Collection</h3>
                      <p className="text-muted-foreground">
                        We collect personal information that you provide to us, including but not limited to: name, email address, health information, symptoms, medical images, and other health-related data you input into the Service.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">2. Use of Data</h3>
                      <p className="text-muted-foreground">
                        Your data may be used to provide and maintain the Service, improve our AI algorithms, send you notifications, and communicate with you regarding service updates or promotional offers.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">3. Data Protection</h3>
                      <p className="text-muted-foreground">
                        We implement security measures designed to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet is 100% secure.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">4. Data Sharing</h3>
                      <p className="text-muted-foreground">
                        We do not sell your personal information. We may share anonymized, aggregated data for research purposes or with third-party service providers who assist us in operating the Service.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">5. Your Rights</h3>
                      <p className="text-muted-foreground">
                        You have the right to access, correct, or delete your personal information. You may also opt out of certain data collection or processing activities.
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="payments" className="space-y-6">
                  <h2 className="text-2xl font-semibold">Payment Terms</h2>
                  
                  <div className="space-y-6">
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">1. Subscription Plans</h3>
                      <p className="text-muted-foreground">
                        We offer several subscription plans with different features and pricing. You may upgrade, downgrade, or cancel your subscription at any time through your account settings.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">2. Billing Cycle</h3>
                      <p className="text-muted-foreground">
                        Subscription fees are billed in advance on either a monthly or yearly basis, depending on the subscription plan you select. Payment will be charged to your chosen payment method at confirmation of purchase.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">3. Cryptocurrency Payments</h3>
                      <p className="text-muted-foreground">
                        For cryptocurrency payments, transactions are processed through blockchain networks. Due to the nature of blockchain technology, all payments are final and non-refundable once confirmed on the blockchain.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">4. Refund Policy</h3>
                      <p className="text-muted-foreground">
                        For traditional payment methods, we offer a 14-day refund policy. If you are not satisfied with the Service, you may request a refund within 14 days of your initial purchase.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">5. Price Changes</h3>
                      <p className="text-muted-foreground">
                        We reserve the right to modify our pricing at any time. If we change pricing, we will provide notice of the change on our website or via email at least 30 days before the change takes effect.
                      </p>
                    </section>
                  </div>
                </TabsContent>
                
                <TabsContent value="disclaimers" className="space-y-6">
                  <h2 className="text-2xl font-semibold">Disclaimers and Limitations</h2>
                  
                  <div className="space-y-6">
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">1. Medical Disclaimer</h3>
                      <p className="text-muted-foreground">
                        <strong>The Service is not a substitute for professional medical advice, diagnosis, or treatment.</strong> The content provided by the Service is for informational purposes only. Always seek the advice of a physician or other qualified healthcare provider with any questions regarding your health.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">2. AI Limitations</h3>
                      <p className="text-muted-foreground">
                        Our AI technology has limitations and may not identify all medical conditions or provide accurate health assessments in all cases. The Service's analyses should be verified by healthcare professionals.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">3. Limitation of Liability</h3>
                      <p className="text-muted-foreground">
                        To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">4. Service "As Is"</h3>
                      <p className="text-muted-foreground">
                        The Service is provided on an "as is" and "as available" basis without any warranties, expressed or implied. We do not warrant that the Service will be uninterrupted, timely, secure, or error-free.
                      </p>
                    </section>
                    
                    <section className="space-y-3">
                      <h3 className="text-xl font-medium">5. Emergency Situations</h3>
                      <p className="text-muted-foreground">
                        <strong>The Service is not designed for emergency situations.</strong> In case of a medical emergency, immediately call your local emergency services or go to the nearest emergency room.
                      </p>
                    </section>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

          {/* Acceptance Section */}
          <motion.div variants={fadeIn} className="bg-muted rounded-lg p-6 border border-border">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Your Agreement</h3>
                <p className="text-sm text-muted-foreground">
                  By using GenZ Health AI Doctor, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={fadeIn} className="text-center">
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please{" "}
              <a href="/contact" className="text-primary hover:underline">contact us</a>.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService;