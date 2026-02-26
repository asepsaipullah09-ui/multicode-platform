# TODO: Animated Stats Counter

## Backend - Step 1
- [x] Create `server/controllers/statsController.js` - GET endpoint to count languages and users
- [x] Create `server/routes/statsRoutes.js` - Route with `protect` middleware
- [x] Update `server/server.js` - Add stats routes

## Frontend - Step 2
- [x] Add stats state: `{ totalLanguages: 0, totalUsers: 0 }`
- [x] Add useEffect to fetch stats from `/api/stats`
- [x] Add Counter component using `framer-motion`'s `animate`
- [x] Add Stats Cards above the language grid with motion animation
