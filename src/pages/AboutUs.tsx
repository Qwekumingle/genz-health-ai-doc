import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Users, Building } from "lucide-react";
import { fadeIn, staggerContainer, slideInFromLeft, slideInFromRight } from '@/lib/animations';

const AboutUs = () => {
  return (
    <div className="py-16 bg-background">
      <div className="genz-container">
        <motion.div 
          className="space-y-16"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* Hero Section */}
          <motion.div variants={fadeIn} className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-genz-gradient bg-clip-text text-transparent">
              About GenZ Doctor
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing healthcare for the digital generation with AI-powered diagnostics, 
              simplified medical advice, and easy access to healthcare professionals.
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
          >
            <motion.div variants={slideInFromLeft} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground">
                GenZ Doctor was founded with a simple yet powerful vision: to make healthcare accessible, 
                understandable, and relatable for the digital-native generation. We believe healthcare 
                shouldn't be confusing, intimidating, or time-consuming.
              </p>
              <p className="text-muted-foreground">
                By combining cutting-edge AI technology with human medical expertise, we're building 
                a healthcare platform that speaks your language, respects your time, and delivers 
                accurate information when you need it most.
              </p>
            </motion.div>
            
            <motion.div variants={slideInFromRight} className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Digital Healthcare" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Value Cards */}
          <motion.div variants={fadeIn} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Our Values</h2>
              <p className="text-muted-foreground mt-2">The principles that guide everything we do</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Accessibility</h3>
                  <p className="text-muted-foreground">
                    Healthcare should be available to everyone, anywhere, anytime, 
                    regardless of location or circumstances.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Empathy</h3>
                  <p className="text-muted-foreground">
                    We approach healthcare with understanding, compassion, 
                    and respect for each person's unique needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-secondary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Info className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                    We constantly explore new technologies and approaches 
                    to improve the healthcare experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Team Preview */}
          <motion.div variants={fadeIn} className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Behind GenZ Doctor is a diverse team of medical professionals, technology experts,
              and healthcare innovators committed to transforming healthcare.
            </p>
            <div className="mt-4">
              <a href="/doctors" className="text-primary hover:underline text-lg font-medium">
                Meet our doctors →
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
