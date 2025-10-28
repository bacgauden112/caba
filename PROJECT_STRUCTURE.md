```
caba/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── icons/                 # App icons (192x192, 512x512)
│   └── service-worker.js      # Service Worker
├── src/
│   ├── components/
│   │   ├── Map/
│   │   │   ├── MapView.jsx           # OpenStreetMap component
│   │   │   └── MarkerPopup.jsx       # Popup hiển thị thông tin điểm
│   │   ├── MarkerForm/
│   │   │   ├── CreateMarker.jsx      # Form tạo điểm cảnh báo
│   │   │   ├── ImageUpload.jsx       # Upload ảnh
│   │   │   └── LocationInput.jsx     # Input vị trí
│   │   ├── Interaction/
│   │   │   ├── VoteButton.jsx        # Vote điểm
│   │   │   └── CommentSection.jsx    # Comment
│   │   └── Layout/
│   │       ├── Header.jsx
│   │       └── Sidebar.jsx
│   ├── hooks/
│   │   ├── useGeolocation.js         # Hook lấy vị trí
│   │   └── useMarkers.js             # Hook quản lý markers
│   ├── services/
│   │   ├── api.js                    # API calls
│   │   ├── geolocation.js            # Geolocation service
│   │   └── storage.js                # LocalStorage/IndexedDB
│   ├── utils/
│   │   ├── permissions.js            # Xử lý permissions
│   │   └── imageCompression.js       # Nén ảnh
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   ├── main.jsx
│   └── registerSW.js                 # Register Service Worker
├── package.json
├── vite.config.js
└── README.md
```