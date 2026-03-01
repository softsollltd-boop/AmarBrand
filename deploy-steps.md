
# Vibe-Store BD: Performance Deployment Guide

## 1. Backend (Laravel API)
- **Host**: DigitalOcean Droplet (Ubuntu 22.04) in Bangalore (BLR1).
- **Process Manager**: Laravel Octane with Swoole.
- **Commands**:
  ```bash
  composer install --optimize-autoloader --no-dev
  php artisan optimize
  php artisan octane:start --server=swoole --port=8000 --workers=auto
  ```
- **Reverse Proxy**: Nginx with SSL via Certbot.

## 2. Frontend (Next.js)
- **Host**: Vercel.
- **Environment Variables**:
  - `NEXT_PUBLIC_API_URL`: Your backend URL (e.g., `https://api.vibe-store.bd/api/v1`)
  - `API_KEY`: Your Gemini API Key.

## 3. Database & Caching
- **MySQL**: Use indexes on `slug`, `sku`, and `order_number`.
- **Redis**: Configure as the `CACHE_DRIVER` and `SESSION_DRIVER` in `.env`.

## 4. Media & Assets
- Set `FILESYSTEM_DISK=s3` in `.env`.
- Point `AWS_URL` to your Cloudflare CDN hostname.
- Enable **Cloudflare Polish** (Lossy) and **Brotli** for maximum image compression.

## 5. Security Checklist
- Set `APP_DEBUG=false` in backend `.env`.
- Use **Sanctum** for mobile/web auth.
- Enable **Cloudflare WAF** to block common SQLi/XSS attacks targeting the BD market.
