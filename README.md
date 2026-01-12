# Work-Note 📝

A minimal, beautiful task manager designed to help you focus on what matters most.

![Work-Note](src/assets/worknote-logo.png)

## 🌟 Features

### Authentication
- **Sign Up** - Create a new account with email, password, and full name
- **Sign In** - Secure login with email and password
- **Sign Out** - Logout from your account
- **Session Persistence** - Stay logged in across browser sessions

### Task Management
- **Create Tasks** - Add new tasks with title, description, due date, and priority
- **Edit Tasks** - Modify existing tasks via edit dialog
- **Delete Tasks** - Remove tasks you no longer need
- **Toggle Status** - Mark tasks as completed or pending with a single click
- **Priority Levels** - Categorize tasks as Low, Medium, or High priority

### Task Filtering
- **All Tasks** - View all your tasks
- **Today** - Filter tasks due today
- **Pending** - Show only incomplete tasks
- **Completed** - View finished tasks
- **Custom Date** - Pick a specific date to filter tasks

### Dashboard Statistics
- Total Tasks count
- Completed Tasks count
- Pending Tasks count
- Completion Rate percentage

### UI/UX Features
- 🎨 Modern, clean design with calming teal color palette
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations with Framer Motion
- 🌙 Professional typography (Inter + Space Grotesk fonts)
- 🔔 Toast notifications for user feedback

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | Pre-built UI components |
| **Supabase** | Backend (Auth + PostgreSQL Database) |
| **React Query** | Server state management |
| **Framer Motion** | Animations |
| **React Router** | Client-side routing |
| **React Hook Form + Zod** | Form handling & validation |
| **date-fns** | Date utilities |
| **Lucide React** | Icons |

## 📁 Project Structure

```
src/
├── assets/              # Static assets (logo, images)
├── components/
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components (TaskList, TaskItem, etc.)
│   ├── landing/         # Landing page components (Hero, Navbar)
│   └── ui/              # Reusable UI components (shadcn/ui)
├── contexts/            # React Context providers (AuthContext)
├── hooks/               # Custom hooks (useTasks, useToast)
├── integrations/        # External service integrations (Supabase)
├── lib/                 # Utility functions
├── pages/               # Page components (Index, Auth, Dashboard, NotFound)
├── App.tsx              # Main app component with routing
├── main.tsx             # App entry point
└── index.css            # Global styles & design tokens
```

## 🗄️ Database Schema

### Profiles Table
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key to auth.users)
- `full_name` - Text
- `avatar_url` - Text
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Tasks Table
- `id` - UUID (Primary Key)
- `user_id` - UUID (Foreign Key to auth.users)
- `title` - Text (Required)
- `description` - Text
- `due_date` - Date
- `priority` - Text ('low' | 'medium' | 'high')
- `status` - Text ('pending' | 'completed')
- `created_at` - Timestamp
- `updated_at` - Timestamp

> Row Level Security (RLS) is enabled - users can only access their own data.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or bun
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WORK-NOTE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Run the migration file in your Supabase SQL editor:
   - Located at: `supabase/migrations/20260110180132_cacc7f6b-ffea-42aa-9a9b-0ffbfdbb707e.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📦 Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` folder.

## 🌐 Deployment

This app is ready to deploy on:

- **Vercel** - Connect your GitHub repo and deploy automatically
- **Netlify** - Drag & drop the `dist` folder or connect repo
- **Cloudflare Pages** - Connect repo and set build command to `npm run build`
- **Firebase Hosting** - Use Firebase CLI to deploy

### Environment Variables for Deployment

Make sure to set these environment variables in your deployment platform:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/public key |

## ✅ Functionality Checklist

| Feature | Status |
|---------|--------|
| Landing Page | ✅ Working |
| User Registration | ✅ Working |
| User Login | ✅ Working |
| User Logout | ✅ Working |
| Protected Routes | ✅ Working |
| Create Task | ✅ Working |
| Edit Task | ✅ Working |
| Delete Task | ✅ Working |
| Toggle Task Status | ✅ Working |
| Task Filtering | ✅ Working |
| Task Statistics | ✅ Working |
| Responsive Design | ✅ Working |
| Production Build | ✅ Working |

## 📄 License

MIT License

---

**Work-Note** - Your daily productivity companion 🚀
