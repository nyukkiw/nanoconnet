# Supabase Integration Guide

## ✅ Supabase Client Implementation

NANOConnect sekarang **fully integrated dengan Supabase** melalui proper service layer architecture.

## 📂 Service Layer Structure

```
src/services/
├── supabaseClient.js      ← Supabase client initialization
├── authService.js         ← Authentication operations
├── influencerService.js   ← Influencer data operations  
├── bookingService.js      ← Booking/collaboration operations
├── matchingService.js     ← AI matching algorithm
├── userService.js         ← User profile operations
├── AuthContext.jsx        ← React context for auth state
└── index.js              ← Central export
```

## 🔌 Supabase Client

### File: `supabaseClient.js`

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Persyaratan .env:**
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔐 Auth Service

### Fitur:
- ✅ Register user baru
- ✅ Login dengan email/password
- ✅ OAuth provider login (Google, GitHub, dll)
- ✅ Logout
- ✅ Get current user
- ✅ Reset password
- ✅ Listen to auth state changes

### Contoh Penggunaan:

```javascript
import { authService } from '../services'

// Register
const { user, error } = await authService.register(
  'user@example.com',
  'password123',
  {
    name: 'John Doe',
    user_type: 'sme', // 'sme' atau 'influencer'
    niche: 'Beauty' // untuk influencer
  }
)

// Login
const { user, error } = await authService.login(
  'user@example.com',
  'password123'
)

// Get current session
const { user, error } = await authService.getCurrentUser()
```

## 👥 Influencer Service

### Fitur:
- ✅ Get all influencers dengan filter
- ✅ Get influencer by ID
- ✅ Search influencers
- ✅ Get influencer reviews
- ✅ Get top influencers by rating

### Contoh Penggunaan:

```javascript
import { influencerService } from '../services'

// Get all influencers
const { data, error } = await influencerService.getInfluencers({
  niche: 'Beauty',
  minPrice: 200,
  maxPrice: 1000,
  location: 'Jakarta'
})

// Get single influencer
const { data, error } = await influencerService.getInfluencerById(id)

// Search
const { data, error } = await influencerService.searchInfluencers('Sarah')
```

## 📅 Booking Service

### Fitur:
- ✅ Create booking request
- ✅ Get user bookings
- ✅ Get booking details
- ✅ Update booking status
- ✅ Cancel booking

### Contoh Penggunaan:

```javascript
import { bookingService } from '../services'

// Create booking
const { data, error } = await bookingService.createBooking({
  smeId: 'user-id',
  influencerId: 'influencer-id',
  campaignName: 'Summer Campaign',
  budget: 5000,
  numPosts: 5,
  startDate: '2026-03-01',
  endDate: '2026-03-31',
  description: 'Campaign details...'
})

// Get my bookings
const { data, error } = await bookingService.getUserBookings(userId, 'sme')

// Update status
const { data, error } = await bookingService.updateBookingStatus(bookingId, 'approved')
```

## 🤖 Matching Service

### Fitur:
- ✅ Calculate match score
- ✅ Get personalized recommendations
- ✅ Save match scores

### Contoh Penggunaan:

```javascript
import { matchingService } from '../services'

// Calculate score
const { matchScore, factors, error } = await matchingService.calculateMatchScore(
  smeId,
  influencerId
)

// Get recommendations
const { recommendations, error } = await matchingService.getRecommendations(
  smeId,
  limit = 5
)

// factors breakdown:
// - budget (0-40 points)
// - niche (0-35 points)
// - engagement (0-15 points)
// - location (0-10 points)
```

## 👤 User Service

### Fitur:
- ✅ Get user profile
- ✅ Get influencer full profile
- ✅ Get SME full profile
- ✅ Update user profile
- ✅ Update influencer profile
- ✅ Upload profile image

### Contoh Penggunaan:

```javascript
import { userService } from '../services'

// Get profile
const { data, error } = await userService.getUserProfile(userId)

// Update profile
const { data, error } = await userService.updateUserProfile(userId, {
  name: 'New Name',
  bio: 'New bio',
  location: 'Jakarta'
})

// Upload image
const { publicUrl, error } = await userService.uploadProfileImage(userId, file)
```

## 🔄 Auth Context Hook

Gunakan hook `useAuth()` di components untuk access auth state:

```javascript
import { useAuth } from '../services/AuthContext'

function MyComponent() {
  const { 
    user,           // Current user object
    userProfile,    // User profile data
    isAuthenticated,// Boolean
    loading,        // Loading state
    error,          // Error message
    sign: {
      login,        // Function to login
      register,     // Function to register
      logout        // Function to logout
    }
  } = useAuth()

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {userProfile?.name}</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  )
}
```

## 📦 Central API Export

Gunakan `index.js` untuk import semua services:

```javascript
// Option 1: Import individual services
import { authService, influencerService, bookingService } from '../services'

// Option 2: Import api object
import { api } from '../services'

// Usage
api.auth.login(email, password)
api.influencer.getInfluencers()
api.booking.createBooking(data)
api.matching.getRecommendations(smeId)
api.user.getUserProfile(userId)
```

## 🔗 Integration Examples

### Pages yang sudah integrated:
- ✅ **LoginPage.jsx** - Uses `authService.login()` via `useAuth()`
- ✅ **RegisterPage.jsx** - Uses `authService.register()` via `useAuth()`
- ✅ **Navigation.jsx** - Uses `useAuth()` untuk display user info
- ✅ **InfluencerListingPage.jsx** - Uses `influencerService.getInfluencers()`

### Tersedia untuk di-integrate:
- InfluencerDetailPage - Get influencer detail + reviews
- BookingPage - Create booking via `bookingService`
- AIRecommendationsPage - Get recommendations via `matchingService`

## 🛠️ Setup Checklist

- [ ] Create Supabase project di https://app.supabase.com
- [ ] Get Project URL dan Anon Key
- [ ] Create `.env` file dengan credentials
- [ ] Import `specdb.sql` ke Supabase SQL Editor
- [ ] Enable Authentication providers (Email, Google, GitHub)
- [ ] Setup Row Level Security (RLS) policies
- [ ] Create Storage buckets (profile-images)
- [ ] Test login/register locally

## 📝 Error Handling

Semua service functions return object dengan struktur:

```javascript
{
  data: null,
  error: "error message" // null jika sukses
}
```

Contoh error handling:

```javascript
const { data, error } = await authService.login(email, password)
if (error) {
  console.error('Login failed:', error)
  // Show error to user
} else {
  // Login sukses
  navigate('/')
}
```

## 🚀 Deployment

Saat deploy ke production:
1. Update `.env` dengan production Supabase URL
2. Ensure Supabase project in production mode
3. Setup proper RLS policies
4. Enable CORS untuk domain Anda
5. Configure SSL certificates
6. Test auth flow di production

## 📚 Resources

- Supabase Docs: https://supabase.com/docs
- JS Client Lib: https://github.com/supabase/supabase-js
- Auth Concepts: https://supabase.com/docs/guides/auth

---
**Status**: ✅ Fully Integrated
**Last Updated**: February 17, 2026
