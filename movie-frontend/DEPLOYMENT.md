# Deployment Guide

## Overview

This guide explains how to deploy the Movie Frontend application to various platforms.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Built project files (run `npm run build` first)

## Build for Production

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

This creates a `build/` folder with the production-ready files.

## Deployment Options

### 1. Static File Hosting (Netlify, Vercel, GitHub Pages)

#### Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy

#### Vercel
1. Connect your repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`
4. Deploy

#### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "homepage": "https://yourusername.github.io/repository-name",
   "predeploy": "npm run build",
   "deploy": "gh-pages -d build"
   ```
3. Run: `npm run deploy`

### 2. Traditional Web Server (Apache, Nginx)

#### Apache
1. Copy `build/` contents to your web root
2. Create `.htaccess` file in the root:
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QR,L]
   ```

#### Nginx
1. Copy `build/` contents to your web root
2. Configure nginx:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

### 3. Docker

Create a `Dockerfile`:
```dockerfile
FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:
```nginx
events {
  worker_connections 1024;
}

http {
  server {
    listen 80;
    location / {
      root /usr/share/nginx/html;
      index index.html index.htm;
      try_files $uri $uri/ /index.html;
    }
  }
}
```

Build and run:
```bash
docker build -t movie-frontend .
docker run -p 80:80 movie-frontend
```

### 4. Cloud Platforms

#### AWS S3 + CloudFront
1. Create S3 bucket
2. Upload build files
3. Configure static website hosting
4. Set up CloudFront distribution

#### Google Cloud Storage
1. Create bucket
2. Upload build files
3. Configure bucket for static website hosting

## Environment Variables

For different environments, you may need to set:

```bash
# Development
REACT_APP_API_URL=http://localhost:8080

# Production
REACT_APP_API_URL=https://your-api-domain.com
```

Update `src/services/movieService.ts` to use environment variables:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
```

## Performance Optimization

### 1. Enable Gzip Compression
Configure your web server to compress static assets.

### 2. Set Cache Headers
```apache
# Apache
<FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
  ExpiresActive On
  ExpiresDefault "access plus 1 year"
</FilesMatch>
```

### 3. Content Security Policy
Add CSP headers for security:
```
Content-Security-Policy: default-src 'self'; img-src 'self' https://image.tmdb.org https://via.placeholder.com; script-src 'self'; style-src 'self' 'unsafe-inline'
```

## Monitoring and Analytics

### 1. Add Google Analytics
Install: `npm install gtag`

In `src/index.tsx`:
```typescript
import { gtag } from 'gtag';

gtag('config', 'GA_TRACKING_ID');
```

### 2. Error Tracking
Consider adding Sentry for error tracking:
```bash
npm install @sentry/react @sentry/tracing
```

## Health Checks

The application includes:
- Demo mode for testing without backend
- Error handling with retry functionality
- Loading states
- Fallback images

## Troubleshooting

### Common Issues

1. **Blank page after deployment**
   - Check browser console for errors
   - Verify API endpoints are accessible
   - Check CORS settings on backend

2. **Images not loading**
   - Verify image URLs are accessible
   - Check Content Security Policy settings

3. **API connection fails**
   - Verify backend is running
   - Check network connectivity
   - Use demo mode for testing

### Debug Mode

Enable demo mode if backend is not available:
- Click "View Demo" button in the application
- This shows sample movie data for testing UI

## Security Considerations

1. **HTTPS**: Always use HTTPS in production
2. **CORS**: Configure proper CORS settings on backend
3. **CSP**: Implement Content Security Policy headers
4. **Environment Variables**: Don't commit sensitive data to version control

## Performance Metrics

Target performance metrics:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

Monitor these using Google PageSpeed Insights or similar tools.