# 💼 Raunak Kumar Jha - Portfolio Website

A modern, responsive personal portfolio website showcasing my work as a Full Stack Developer with expertise in backend development and DevOps. Built with HTML, CSS, JavaScript, and featuring stunning particle effects and animations.

[![Portfolio](https://img.shields.io/badge/Portfolio-Live-1DCD9F)](https://imraunak.dev)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🚀 Features

### ✨ **Core Features**
- **Fully Responsive** - Optimized for all devices and screen sizes
- **Interactive Animations** - Smooth GSAP animations and scroll effects
- **Particle Backgrounds** - Constellation effects in multiple sections
- **Matrix Rain Effect** - Animated matrix rain in tech stack section
- **Custom Cursor** - Unique cursor implementation
- **Animated Name Effect** - Hover effect on hero name
- **Smooth Scrolling** - Enhanced user experience with smooth navigation

### 📧 **Contact Form**
- Functional contact form with Formspree integration
- Real-time form validation with gibberish detection
- Professional error and success messaging
- Loading states and user feedback
- Email fallback option

### ⚡ **Performance Optimizations**
- Optimized particle systems for smooth performance
- Lazy loading for images
- Reduced motion support for accessibility
- Service Worker for offline functionality
- Critical CSS optimization
- Efficient animation rendering

### 🐙 **GitHub Integration**
- Live GitHub statistics (repos, stars, followers, commits)
- Recent activity feed with event types
- Most used programming languages display
- Real-time data from GitHub API
- Fallback data for offline viewing

### 🎨 **Enhanced UI/UX**
- Dark theme with green (#1DCD9F) accent colors
- Smooth animations and transitions
- Interactive journey timeline
- Professional footer with social links
- Certifications showcase
- Project portfolio with tech stack badges

---

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Custom styling with Bootstrap 5 + Tailwind CSS
- **JavaScript** - Core interactivity and animations
- **GSAP** - Advanced animations and scroll triggers  
- **Particles.js** - Interactive constellation backgrounds
- **Formspree** - Contact form backend
- **GitHub API** - Live coding activity integration
- **Font Awesome** - Icon library
- **Google Fonts** - Special Gothic Expanded One typography

---

## 📸 Sections

- **Hero** - Animated introduction with particle background
- **About** - Personal bio and social links with constellation effect
- **Journey** - Timeline of education and experience with particles
- **Tech Stack** - Skills and technologies with matrix rain effect
- **GitHub Activity** - Live GitHub statistics and recent activity
- **Projects** - Portfolio showcase with live demos and source code
- **Certifications** - Professional certifications display
- **Contact** - Get in touch section with constellation background
- **Footer** - Links and information with particle effects

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/raunak0400/portfolio.git
   cd portfolio/Portfolio
   ```

2. **Run locally**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. **Customize**
   - Update personal information in `index.html`
   - Modify colors in `styles.css`
   - Add your own projects and content
   - Update GitHub username in `script.js` (line 626)
   - Update Formspree endpoint in `script.js` (line 501)

---

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main HTML file
├── styles.css              # Custom styles and animations
├── script.js               # Core JavaScript functionality
├── additional-effects.js   # Particle and matrix rain effects
├── manifest.json          # PWA manifest
├── sw.js                  # Service Worker
├── assets/                # Images and media files
│   ├── LOGO.png
│   ├── cursor.png
│   └── [project images]
├── README.md              # Project documentation
├── LICENSE                # MIT License
├── CONTRIBUTING.md        # Contribution guidelines
└── SECURITY.md            # Security policy
```

---

## 🔧 Configuration

### Contact Form
Update the Formspree endpoint in `script.js`:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
```

### GitHub Integration
Update your GitHub username in `script.js`:
```javascript
const username = 'YOUR_GITHUB_USERNAME';
```

### Email
Update email addresses in:
- `index.html` - Fixed email link and contact section
- `script.js` - Contact form mailto fallback

---

## 🌐 Deployment

This portfolio can be deployed on:

- **Vercel** - Recommended (Zero config, automatic deployments)
- **Netlify** - Drag-and-drop deployment
- **GitHub Pages** - Free hosting for GitHub repos
- **Cloudflare Pages** - Fast global CDN

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd Portfolio
vercel
```

---

## 📈 Performance

- **Optimized Particles** - Reduced count (30 particles) for smooth performance
- **Efficient Animations** - Hardware-accelerated CSS animations
- **Lazy Loading** - Images load on demand
- **Minified Assets** - Compressed for faster loading
- **CDN Delivery** - Fast content delivery

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 🔒 Security

Found a security issue? Please see [SECURITY.md](SECURITY.md) for reporting instructions.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **Email**: [contact@imraunak.dev](mailto:contact@imraunak.dev)
- **LinkedIn**: [Raunak Kumar Jha](https://www.linkedin.com/in/raunak0400)
- **GitHub**: [@raunak0400](https://github.com/raunak0400)
- **Instagram**: [@raunakj.wtf](https://www.instagram.com/raunakj.wtf)
- **Twitter**: [@raunak0400](https://twitter.com/raunak0400)
- **LeetCode**: [@raunak0400](https://leetcode.com/raunak0400)

---

## 🙏 Acknowledgments

- [Particles.js](https://vincentgarreau.com/particles.js/) - Interactive particle backgrounds
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Formspree](https://formspree.io/) - Form backend service
- [Font Awesome](https://fontawesome.com/) - Icon library

---

<div align="center">

**Made with ❤️ and ☕ by Raunak Kumar Jha**

⭐ Star this repo if you found it helpful!

</div>
