import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fadeIn, staggerContainer } from '@/lib/animations';
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Form schema validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send the form data to your backend
    console.log(values);
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

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
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-6 h-full">
                  <div className="mb-4 bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    For general inquiries and support
                  </p>
                  <a href="mailto:support@genzdoctor.com" className="text-primary hover:underline mt-4">
                    papakofiboahen@gmail.com
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-6 h-full">
                  <div className="mb-4 bg-secondary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-muted-foreground">
                    Available Monday to Friday, 9am to 5pm
                  </p>
                  <a href="tel:+11234567890" className="text-primary hover:underline mt-4">
                    +1 (123) 456-7890
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-6 h-full">
                  <div className="mb-4 bg-accent/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Office</h3>
                  <p className="text-muted-foreground">
                    Our headquarters location
                  </p>
                  <address className="not-italic text-primary mt-4">
                    123 Health Avenue<br />
                    San Francisco, CA 94103
                  </address>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-6 w-6" />
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this regarding?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-genz-gradient hover:opacity-90"
                      size="lg"
                    >
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={fadeIn} className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Can't find what you're looking for? Check our <a href="/faq" className="text-primary hover:underline">FAQ page</a> or reach out directly!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;