# 🧮 Modern Calculator PWA

A sleek, modern calculator web application built with Python Flask that works as a Progressive Web App (PWA). Install it on your Android phone or desktop for a native app-like experience!

![Calculator](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Flask](https://img.shields.io/badge/Flask-3.0+-green.svg)
![PWA](https://img.shields.io/badge/PWA-Enabled-purple.svg)

## ✨ Features

- 🎨 **Modern UI** - Beautiful dark/light theme with smooth animations
- 🔬 **Scientific Mode** - Trigonometric functions (sin, cos, tan), logarithms, square root, and power operations
- 📱 **Progressive Web App** - Install on Android/iOS/Desktop for offline use
- 📊 **History Tracking** - Keep track of your recent calculations
- ⌨️ **Keyboard Support** - Use your keyboard for faster input
- 💾 **Memory Functions** - MC, MR, M+, M- for storing values
- 🌓 **Theme Toggle** - Switch between dark and light modes
- 📐 **Degrees Mode** - Trigonometric calculations in degrees

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Davy255/modern-calculator-pwa.git
cd modern-calculator-pwa
```

2. Create a virtual environment:
```bash
python -m venv .venv
```

3. Activate the virtual environment:
   - Windows: `.\.venv\Scripts\Activate.ps1`
   - Linux/Mac: `source .venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the application:
```bash
python app.py
```

6. Open your browser and navigate to:
```
http://localhost:5000
```

## 📱 Installing as PWA

### On Desktop (Chrome/Edge):
1. Click the **INSTALL** button in the header
2. Or use the browser's install prompt (address bar icon)

### On Android:
1. Deploy the app with HTTPS (required for PWA)
2. Open in Chrome browser
3. Tap "Add to Home Screen"
4. The app will appear on your home screen like a native app!

### Quick Testing with ngrok:
```bash
ngrok http 5000
```
Then open the HTTPS URL on your phone.

## 🎯 Usage

### Basic Operations
- Click number buttons or use your keyboard
- Use +, -, *, / for basic arithmetic
- Press = or Enter to calculate

### Scientific Functions
- Click **SCI** button to toggle scientific mode
- Functions include: sin, cos, tan, log, ln, sqrt, x^y
- Use π (pi) and e constants

### Memory Functions
- **MC**: Clear memory
- **MR**: Recall memory
- **M+**: Add to memory
- **M-**: Subtract from memory

### History
- Click **HISTORY** to view recent calculations
- Last 3 calculations are saved

## 🛠️ Technologies Used

- **Backend**: Python, Flask
- **Frontend**: HTML5, CSS3, JavaScript
- **Math Library**: Math.js
- **PWA**: Service Workers, Web App Manifest
- **Design**: Custom CSS with modern gradients and animations

## 📂 Project Structure

```
modern-calculator-pwa/
├── app.py                 # Flask application
├── static/
│   ├── app.js            # Calculator logic & PWA install prompt
│   ├── styles.css        # UI styling
│   ├── manifest.json     # PWA manifest
│   ├── service-worker.js # Offline caching
│   └── icon.svg          # App icon template
├── templates/
│   └── index.html        # Main HTML template
└── README.md
```

## 🎨 Creating App Icons

To complete the PWA setup:

1. Convert `static/icon.svg` to PNG format:
   - `icon-192.png` (192x192 pixels)
   - `icon-512.png` (512x512 pixels)

2. Use online tools like [Favicon Generator](https://realfavicongenerator.net/)

3. Place icons in the `static/` folder

See `CREATE_ICONS.md` for detailed instructions.

## 🌐 Deployment

### Recommended Platforms:
- **Railway**: Easy Python deployment
- **Heroku**: Classic choice for Flask apps
- **Vercel**: Serverless deployment
- **PythonAnywhere**: Free tier available

All require HTTPS for PWA features to work on mobile devices.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**David Ongoma Wesonga**
- GitHub: [@Davy255](https://github.com/Davy255)
- Bio: Software Engineering Student | Passionate about AI & Backend Development

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

Built with ❤️ using Python and Flask
