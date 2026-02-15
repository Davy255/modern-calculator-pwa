# Creating PWA Icons

Your calculator is now a Progressive Web App! To complete the setup, you need to create app icons.

## Quick Method: Using Online Tools

1. Visit [Favicon Generator](https://realfavicongenerator.net/) or [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)
2. Upload the `static/icon.svg` file
3. Download the generated icons
4. Place `icon-192.png` and `icon-512.png` in the `static/` folder

## Manual Method: Using Image Editor

1. Open `static/icon.svg` in an image editor (GIMP, Photoshop, Inkscape)
2. Export as PNG:
   - `icon-192.png` (192x192 pixels)
   - `icon-512.png` (512x512 pixels)
3. Place both files in the `static/` folder

## Testing Your PWA

1. Run your Flask app: `python app.py`
2. Open in Chrome: `http://localhost:5000`
3. Click the install button that appears in the header
4. Or use Chrome's menu: Three dots → Install App

## Testing on Android

### Method 1: Using ngrok (Recommended for quick testing)
1. Install ngrok: `https://ngrok.com/download`
2. Run: `ngrok http 5000`
3. Open the HTTPS URL on your Android phone
4. Chrome will prompt you to "Add to Home Screen"

### Method 2: Deploy to a server with HTTPS
PWAs require HTTPS to work properly (except on localhost).
- Deploy to Heroku, Vercel, or Railway
- Or use your own server with SSL certificate

## What You Get

✅ Installable app icon on home screen
✅ Full-screen app experience (no browser UI)
✅ Offline functionality (basic caching)
✅ Fast load times
✅ Works like a native app!
