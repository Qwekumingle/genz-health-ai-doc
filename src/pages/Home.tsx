
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
// import { useUser } from '@civic/auth/react';

const Home: React.FC = () => {
  const { user } = useAuth();
  // const { user: civicUser } = useUser();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-genz-gradient py-20 text-white">
        <div className="genz-container">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Your AI-Powered <span className="text-genz-yellow">Medical Assistant</span>
              </h1>
              <p className="text-lg md:text-xl">
                Get instant feedback on your symptoms and medical images from our advanced AI. 
                Upgrade for live consultations with licensed doctors.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="/symptom-analyzer">
                  <Button size="lg" className="w-full bg-white text-primary hover:bg-gray-100 sm:w-auto">
                    Try Symptom Analyzer
                  </Button>
                </Link>
                {
                  user ? (
                    <></>
                  ) : (
                    <Link to="/signup">
                    <Button size="lg" variant="outline" className="w-full bg-white/10 border-white text-white hover:bg-white/10 sm:w-auto">
                      Sign Up Free
                    </Button>
                  </Link>

                  )

                }
               
              </div>
            </div>
            <div className="hidden animate-bounce-slow justify-self-center md:block">
              <div className="relative h-80 w-80 rounded-full bg-white/20 p-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl">👨‍⚕️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="genz-container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How GenZ Doctor Helps You</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Our AI-powered platform provides quick medical insights while maintaining the highest standards of privacy and accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Link to={user ? "/symptom-analyzer" : "/signup"}>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-primary/10 p-3 text-4xl text-primary">🔍</div>
                  <h3 className="mb-2 text-xl font-semibold">Symptom Analysis</h3>
                  <p className="text-muted-foreground">
                    Describe your symptoms in your own words and get AI-powered insights instantly.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to={user ? "/image-analysis" : "/signup"}>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-secondary/10 p-3 text-4xl text-secondary">🩻</div>
                  <h3 className="mb-2 text-xl font-semibold">Image Analysis</h3>
                  <p className="text-muted-foreground">
                    Upload medical images for AI interpretation with references to medical literature.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link to={user ? "/consultations" : "/signup"}>
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-accent/10 p-3 text-4xl text-accent">👩‍⚕️</div>
                  <h3 className="mb-2 text-xl font-semibold">Doctor Consultations</h3>
                  <p className="text-muted-foreground">
                    Premium users can schedule live virtual consultations with licensed doctors.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted py-20">
        <div className="genz-container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Get medical insights in three simple steps
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Enter Your Symptoms</h3>
              <p className="text-muted-foreground">
                Describe how you're feeling or upload relevant medical images.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Get AI Analysis</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your input and provides evidence-based insights.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Take Action</h3>
              <p className="text-muted-foreground">
                Follow recommendations or book a consultation with a doctor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="genz-container">
          <div className="overflow-hidden rounded-3xl bg-genz-gradient p-8 md:p-12">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
              <div className="text-white">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to take control of your health?</h2>
                <p className="mb-6 text-lg">
                  Sign up now and get started with our AI-powered medical assistant for free.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                {
                  user ? (
                    <></>
                  ) : (
                    <Link to="/signup">
                    <Button size="lg" className="w-full text-white hover:text-black sm:w-auto">
                      Sign Up Free
                    </Button>
                  </Link>
                  )
                }
                 
                  <Link to="/pricing">
                    <Button size="lg" variant="outline" className="w-full text-primary hover:bg-gray-100 sm:w-auto">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden justify-self-center md:block">
                <div className="relative h-64 w-64 rounded-full bg-white/20 p-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl">🩺</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;