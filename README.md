# 📚 BookNook (Client)

BookNook is a small online library. Add a book, borrow a book, return a book.

**Live Site:** https://your-live-site-url.vercel.app
**Server Repository:** https://github.com/your-username/booknook-server
**Server Live URL:** https://your-server-url.vercel.app

---

## ✨ Features

- **Browse the library:** See every book in a responsive grid, and view the newest six on the home page under "New Arrivals".
- **Secure authentication:** Register and log in with email and password or with Google, powered by Better Auth with the MongoDB adapter.
- **Password validation:** Registration requires an uppercase letter, a lowercase letter and at least 6 characters.
- **Add your own books:** Logged-in users can share books with a cover image, category, description and number of copies.
- **Manage your books:** Edit a book through a pre-filled form, or delete it after a confirmation modal.
- **Borrow and return:** Borrow a book from its details page and return it from My Borrows. The available copies update automatically.
- **Smart borrowing rules:** A book with 0 copies shows "Not Available", and the same book cannot be borrowed twice by the same user.
- **Protected routes:** Add Book, My Books, My Borrows and Book Details are private. Logged-out users are sent to Login and returned to their page afterward.
- **Feedback everywhere:** Success and error messages use toasts, with no default browser alerts.
- **Responsive design:** Works on mobile, tablet and desktop.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router) with TypeScript
- **UI:** Tailwind CSS, shadcn/ui
- **Authentication:** Better Auth, MongoDB adapter, JWT
- **Slider:** Swiper.js
- **Notifications:** Sonner
- **Icons:** React Icons

---

## 🗺️ Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Home with slider, New Arrivals and extra sections |
| `/books` | Public | All books |
| `/books/:id` | Private | Book details and borrow button |
| `/add-book` | Private | Add a new book |
| `/my-books` | Private | Edit and delete your books |
| `/my-borrows` | Private | Your borrowed books and return button |
| `/login` | Public | Login page |
| `/sign-up` | Public | Registration page |

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/booknook-client.git
cd booknook-client
npm install
```

### 2. Add environment variables

Create a `.env` file in the project root:

```env
# Express server URL
NEXT_PUBLIC_URL=http://localhost:8000

# Database (used by Better Auth)
MONGODB_URI=your_mongodb_connection_string

# Better Auth
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000

# Google login
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

For Google login, add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI in the Google Cloud Console. For production, add your live domain's callback URL too.

### 3. Run the app

```bash
npm run dev
```

Open http://localhost:3000. The [BookNook server](https://github.com/your-username/booknook-server) must be running for books and borrows to load.

---

## 📦 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

---

## 🌐 Deployment

The client is deployed on Vercel. Add the same environment variables in the hosting dashboard, and set `NEXT_PUBLIC_URL` and `BETTER_AUTH_URL` to your live URLs. Also set `CLIENT_URL` on the server to your live client URL.
