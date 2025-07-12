# EcoAI - The Invisible Sustainability Assistant

A modern landing page for EcoAI, a sustainability tech SaaS that automatically reduces the carbon footprint of websites and ad campaigns.

## 🌟 Features

- **Modern Landing Page**: Clean, professional design with 7 key sections
- **Responsive Design**: Optimized for all devices and screen sizes
- **Interactive Elements**: Smooth scrolling, hover effects, and animations
- **Waitlist Functionality**: Working email collection system
- **Professional Images**: High-quality stock photos from Unsplash
- **Green Theme**: Eco-friendly color palette (green, white, charcoal)

## 🚀 Tech Stack

- **Frontend**: React 18, Tailwind CSS, Framer Motion
- **Backend**: FastAPI, Python
- **Database**: MongoDB (ready for production)
- **Deployment**: Supervisor-managed services

## 📋 Landing Page Sections

1. **Hero Section** - Main value proposition with AI dashboard visual
2. **Problem Section** - Digital energy waste pain points
3. **Solution Section** - Website & Ad optimization features  
4. **How It Works** - 3-step process flow
5. **Impact Section** - Performance statistics
6. **Testimonial Section** - Customer success story
7. **Final CTA** - Waitlist signup form

## 🛠️ Development

### Prerequisites
- Node.js 16+
- Python 3.8+
- MongoDB

### Quick Start
```bash
# Install dependencies
cd backend && pip install -r requirements.txt
cd ../frontend && yarn install

# Start services
sudo supervisorctl start all

# Access application
Frontend: http://localhost:3000
Backend API: http://localhost:8001
```

### API Endpoints
- `GET /api/health` - Health check
- `GET /api/stats` - Landing page statistics  
- `POST /api/waitlist` - Email signup

## 🎯 Purpose

This is a prototype landing page designed for a hackathon pitch, showcasing EcoAI as an automated sustainability solution for digital businesses. The design emphasizes modern aesthetics, clear value proposition, and professional presentation suitable for investor demos.

## 🌱 Environmental Impact

EcoAI represents the next generation of sustainability tools - automated, invisible, and effective. Perfect for businesses that want to reduce their environmental impact without changing their workflow.