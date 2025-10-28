# Copilot Instructions for CABA

## Project Overview

CABA is a Vietnamese flood warning PWA built with React + Vite that allows users to create GPS-based warning markers on OpenStreetMap. The app prioritizes offline-first functionality with localStorage fallbacks.

## Key Architecture Patterns

### Offline-First Data Flow

- **API Service**: `src/services/api.js` implements automatic localStorage fallbacks for all operations
- **Pattern**: Try API call → catch error → fallback to localStorage → sync when online
- Always update both remote API and localStorage simultaneously in success cases

### Custom Hooks for State Management

- **`useMarkers()`**: Centralized marker CRUD with optimistic updates
- **`useGeolocation()`**: Handles GPS permissions with Vietnamese error messages
- No external state management - React hooks + localStorage provide sufficient state

### Component Organization

```
src/components/
├── Map/           # Leaflet integration (MapView.jsx, MarkerPopup.jsx)
├── MarkerForm/    # Form components with validation
├── Interaction/   # Vote/comment features
└── Layout/        # App shell components
```

## Development Workflows

### Running the App

```bash
npm run dev          # Development with HMR
npm run build        # Production build with PWA generation
npm run preview      # Test production build locally
```

### PWA Development

- **Config**: `vite.config.js` contains Workbox caching strategies
- **Service Worker**: Auto-registers via `src/registerSW.js`
- **Offline Maps**: OpenStreetMap tiles cached automatically via Workbox
- **Update Handling**: Shows confirmation dialog for app updates

### Environment Setup

Create `.env` with:

```
VITE_API_URL=http://localhost:3000/api
```

## Project-Specific Conventions

### Vietnamese UI Text

- All user-facing strings are in Vietnamese
- Error messages follow pattern: "Không thể [action]: [reason]"
- Location permissions use localized geolocation error handling

### Geolocation Integration

- **Auto-request**: GPS permission requested on app load
- **Fallback UX**: Manual location input when GPS denied/unavailable
- **Accuracy**: Stores GPS accuracy data for validation

### Image Handling

- Uses `browser-image-compression` for automatic client-side compression
- Images stored as base64 in localStorage for offline scenarios
- Component: `src/components/MarkerForm/ImageUpload.jsx`

### Map Integration (Leaflet)

- **Tiles**: OpenStreetMap free tiles (consider paid service for production)
- **Icons**: Custom flood/user markers in `/public/icons/`
- **Center**: Defaults to Đà Nẵng, Vietnam coordinates `[16.0544, 108.2022]`
- **Icon Fix**: Webpack compatibility fix in `MapView.jsx` (lines 8-12)

### Form Validation

- Vietnamese validation messages
- Real-time error clearing on user input
- Required fields: title, description, location coordinates

## Integration Points

### API Expectations

Backend should implement:

- `GET /api/markers` - Returns array of markers
- `POST /api/markers` - Creates new marker
- `PUT/PATCH /api/markers/:id` - Updates existing marker

### PWA Manifest

- Configured for standalone mobile app experience
- Vietnamese app name: "CABA - Cảnh báo lũ lụt"
- Portrait orientation, blue theme (`#2196F3`)

## Common Tasks

### Adding New Marker Types

1. Update `floodIcon` creation in `MapView.jsx`
2. Add new icon files to `/public/icons/`
3. Extend marker data structure in `useMarkers.js`

### Extending Offline Capabilities

- Add new API endpoints to `api.js` with localStorage fallbacks
- Update Workbox caching rules in `vite.config.js`
- Consider IndexedDB for complex offline data (currently uses localStorage)

### Map Customization

- Tile server changes in `MapView.jsx` TileLayer component
- Custom marker styles via Leaflet Icon configuration
- Bounds/zoom restrictions in MapContainer props
