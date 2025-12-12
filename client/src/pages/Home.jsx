/**
 * Home Page
 * Landing page with hero section and features
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiUsers, FiZap, FiLock } from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: <FiCode className="text-4xl" />,
      title: 'Real-Time Collaboration',
      description: 'Code together with your team in real-time, just like Google Docs'
    },
    {
      icon: <FiUsers className="text-4xl" />,
      title: 'Team Management',
      description: 'Invite team members, manage permissions, and collaborate seamlessly'
    },
    {
      icon: <FiZap className="text-4xl" />,
      title: 'Instant Sync',
      description: 'Changes sync instantly across all connected users with WebSocket'
    },
    {
      icon: <FiLock className="text-4xl" />,
      title: 'Secure & Private',
      description: 'Your code is encrypted and secure with JWT authentication'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
              Code Together in Real-Time
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              A collaborative code editor built with MERN stack. 
              Write, share, and collaborate on code with your team instantly.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition text-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose CodeShare?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for collaborative coding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="text-primary-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Coding Together?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of developers collaborating on CodeShare
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg inline-block"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 CodeShare. Built with ❤️ by Shubham Jadhav
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
