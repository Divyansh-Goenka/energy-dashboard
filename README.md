# Energy Dashboard

A comprehensive energy monitoring and management system built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Real-time Energy Monitoring** - Track consumption with 15-minute intervals
- **Advanced Analytics** - Hourly and detailed reporting
- **Admin Control Panel** - Database testing and system configuration
- **Role-based Access** - Admin and client user roles
- **MS SQL Database Integration** - Professional database connectivity
- **Responsive Design** - Works on all devices
- **Modern UI** - Built with Tailwind CSS and Radix UI

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Database**: MS SQL Server with mssql driver
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Authentication**: JWT with bcryptjs

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/energy-dashboard.git
   cd energy-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your database credentials:
   ```env
   DB_SERVER=localhost
   DB_NAME=EMS
   DB_USER=sa
   DB_PASSWORD=your_password
   DB_PORT=1433
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🔑 Demo Accounts

### Admin Accounts (Full Access + Database Testing)
- **Email**: `admin@energydash.com` | **Password**: `admin123`
- **Email**: `admin@company.com` | **Password**: `admin456`

### Client Accounts (Energy Dashboard Only)
- **Email**: `client@abc-corp.com` | **Password**: `client123`
- **Email**: `client@xyz-industries.com` | **Password**: `client456`
- **Email**: `user@testcompany.com` | **Password**: `test123`

## 🏛️ Project Structure

```
energy-dashboard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Homepage
│   │   ├── login/             # Authentication
│   │   ├── main/              # Dashboard
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── admin/             # Admin-only components
│   │   └── energy/            # Energy monitoring components
│   ├── lib/                   # Utilities and helpers
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## 🎨 Key Features

### Admin Panel
- **Database Connection Testing** - Test MS SQL connections with detailed feedback
- **User Management** - Role-based access control
- **System Configuration** - Email settings and report scheduling
- **Logo Management** - Upload and manage company/client logos

### Energy Monitoring
- **15-Minute Data** - Real-time energy consumption tracking
- **Hourly Reports** - Aggregated hourly analytics
- **Detailed Analytics** - Comprehensive energy insights
- **Export Functionality** - Download reports and data

### Authentication
- **Secure Login** - JWT-based authentication
- **Role-based Access** - Admin and client roles
- **Session Management** - Secure session handling

## 🔒 Security

- Environment variables for sensitive data
- JWT token authentication
- Password hashing with bcryptjs
- SQL injection protection with parameterized queries
- CORS and security headers

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Accessible design with ARIA labels
- High contrast and reduced motion support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Built with ❤️ by the Energy Dashboard Team**