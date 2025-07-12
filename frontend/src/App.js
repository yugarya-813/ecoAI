import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

function App() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Fetch stats on component mount
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/stats`);
        setStats(response.data);
      } catch (error) {
        console.log('Failed to fetch stats');
      }
    };
    fetchStats();
  }, []);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await axios.post(`${BACKEND_URL}/api/waitlist`, { email });
      setSubmitMessage('🎉 Successfully added to waitlist!');
      setEmail('');
    } catch (error) {
      setSubmitMessage('❌ Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="App">
      {/* Navigation with Coming Soon Badge */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="section-container py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 gradient-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-eco-charcoal">EcoAI</span>
            <span className="bg-eco-green text-white text-xs px-2 py-1 rounded-full">Coming Soon</span>
          </div>
          <button 
            onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-sm py-2 px-4"
          >
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-eco-charcoal leading-tight mb-6">
                EcoAI – The Invisible 
                <span className="gradient-green bg-clip-text text-transparent"> Sustainability Assistant</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Automatically reduce the carbon footprint of your website and ad campaigns without changing how you work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary"
                >
                  Join the Waitlist
                </button>
                <button 
                  onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                  className="btn-secondary"
                >
                  See How It Works
                </button>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxkYXNoYm9hcmR8ZW58MHx8fHwxNzUyMjI2MjU2fDA&ixlib=rb-4.1.0&q=85"
                alt="AI Dashboard Analytics"
                className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold text-eco-charcoal mb-6">
              Digital businesses waste energy—and don't even know it.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌐",
                title: "Bloated Websites",
                description: "Bloated websites slow down performance and waste server energy."
              },
              {
                icon: "💻",
                title: "Hidden Ad Costs",
                description: "Ads on Google and Meta use serious compute power, with hidden carbon costs."
              },
              {
                icon: "⏰",
                title: "No Time to Fix",
                description: "Business owners are too busy to fix these problems manually."
              }
            ].map((problem, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 card-hover animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold text-eco-charcoal mb-3">{problem.title}</h3>
                <p className="text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold text-eco-charcoal mb-6">
              EcoAI runs in the background and makes your business greener, faster, and smarter.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-slide-in-left">
              <div className="bg-white p-8 rounded-2xl shadow-lg card-hover">
                <img 
                  src="https://images.unsplash.com/photo-1530435460869-d13625c69bbf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHx3ZWJzaXRlJTIwb3B0aW1pemF0aW9ufGVufDB8fHx8MTc1MjMwMjA1NXww&ixlib=rb-4.1.0&q=85"
                  alt="Website Optimization"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-2xl font-bold text-eco-charcoal mb-4">Website Optimization</h3>
                <p className="text-gray-600">
                  EcoAI scans your website and automatically compresses images, minifies code, and speeds up performance. No action needed.
                </p>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-white p-8 rounded-2xl shadow-lg card-hover">
                <img 
                  src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxncmVlbiUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzUyMzAyMDY4fDA&ixlib=rb-4.1.0&q=85"
                  alt="Ad Optimization"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <h3 className="text-2xl font-bold text-eco-charcoal mb-4">Ad Optimization</h3>
                <p className="text-gray-600">
                  EcoAI monitors your Google/Meta ads and reallocates budget to lower-emission campaigns—without hurting your results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="section-container">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold text-eco-charcoal mb-6">Set it and forget it.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Connect Once",
                description: "Connect once to your website and ad accounts.",
                icon: "🔗"
              },
              {
                step: "2", 
                title: "Auto-Optimize",
                description: "EcoAI starts monitoring and optimizing in the background.",
                icon: "⚡"
              },
              {
                step: "3",
                title: "Get Reports",
                description: "You get weekly reports showing saved emissions, faster load speeds, and ad efficiency boosts.",
                icon: "📊"
              }
            ].map((step, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 gradient-green rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-eco-charcoal mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-eco-green text-white">
        <div className="section-container">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-6">Big results, zero extra effort.</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { stat: "30%", label: "Faster websites" },
              { stat: "15-30%", label: "Lower ad emissions" },
              { stat: "100%", label: "Automated" },
              { stat: "Real", label: "Environmental savings, not greenwashing" }
            ].map((item, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl lg:text-5xl font-bold mb-2">{item.stat}</div>
                <div className="text-green-100 text-sm lg:text-base">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="py-16 bg-gray-50">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxzdXN0YWluYWJpbGl0eXxlbnwwfHx8fDE3NTIzMDIwNjJ8MA&ixlib=rb-4.1.0&q=85"
              alt="Sustainability"
              className="w-24 h-24 rounded-full mx-auto mb-8 object-cover"
            />
            <blockquote className="text-2xl lg:text-3xl font-medium text-eco-charcoal mb-8 italic">
              "EcoAI helped us speed up our digital footprint while saving money and building a greener brand."
            </blockquote>
            <p className="text-xl text-eco-green font-semibold">
              Modern businesses deserve modern sustainability tools.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="waitlist" className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center animate-slide-up">
            <h2 className="text-4xl font-bold text-eco-charcoal mb-6">
              Want your business to run cleaner and faster?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Be among the first to try EcoAI when it launches.
            </p>
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn-primary whitespace-nowrap"
              >
                {isSubmitting ? 'Joining...' : 'Request Early Access'}
              </button>
            </form>
            {submitMessage && (
              <p className="mt-4 text-sm font-medium">{submitMessage}</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-eco-charcoal text-white">
        <div className="section-container text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-6 h-6 gradient-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="text-lg font-bold">EcoAI</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 EcoAI. Building a sustainable digital future.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;