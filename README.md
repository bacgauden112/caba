# CABA - Ứng dụng cảnh báo lũ lụt và thiên tai

PWA App giúp người dùng cảnh báo và chia sẻ thông tin về lũ lụt, thiên tai trong khu vực.

## ✨ Tính năng

- 📍 Tạo điểm cảnh báo với GPS tự động hoặc nhập thủ công
- 📸 Upload và nén ảnh tự động
- 🗺️ Hiển thị bản đồ OpenStreetMap
- 👍 Vote và comment trên các điểm cảnh báo
- 📱 PWA - Hoạt động offline, cài đặt như app
- 💾 Lưu trữ local khi không có internet

## 🚀 Cài đặt

```bash
# Clone repository
git clone https://github.com/bacgauden112/caba.git
cd caba

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## 🔧 Cấu hình

Tạo file `.env`:

```env
VITE_API_URL=http://localhost:3000/api
```

## 📱 PWA Features

- Service Worker tự động cache bản đồ OpenStreetMap
- Offline support với localStorage fallback
- Install prompt cho mobile
- Auto-update khi có version mới

## 🗺️ OpenStreetMap

App sử dụng OpenStreetMap tiles miễn phí. Trong production, nên xem xét:
- Sử dụng tile server riêng
- Hoặc đăng ký với Mapbox/Maptiler

## 📝 License

MIT