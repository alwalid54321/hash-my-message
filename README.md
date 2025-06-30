# Hash My Message

![Hash My Message](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🔒 Overview

Hash My Message is a modern, secure web application that allows users to encrypt and decrypt messages using private passphrases. Built with Next.js and Firebase, this application provides a user-friendly interface with strong encryption mechanisms to keep your sensitive messages safe.

## ✨ Features

- **Message Encryption**: Securely encrypt any text message with a passphrase
- **Message Decryption**: Easily decrypt messages using the correct passphrase
- **Unique User IDs**: Anonymous user identification for session management
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern UI**: Built with Tailwind CSS and Radix UI components
- **Firebase Integration**: Secure backend services powered by Firebase

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Backend**: Firebase
- **AI Integration**: GenKit AI
- **Authentication**: Firebase Authentication
- **Deployment**: Vercel/Netlify

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for backend services)

## 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/alwalid54321/hash-my-message.git
cd hash-my-message
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory with your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🏃‍♂️ Running the Application

### Development mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:9002

### Build for production

```bash
npm run build
# or
yarn build
```

### Start production server

```bash
npm start
# or
yarn start
```

## 📊 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── app/            # App router pages
│   ├── components/      # Reusable UI components
│   ├── lib/            # Utility functions and hooks
│   ├── ai/             # AI integration files
│   └── styles/         # Global styles
├── .env.local          # Environment variables
└── next.config.ts      # Next.js configuration
```

## 🔐 Security Features

- Client-side encryption/decryption ensures messages never travel in plaintext
- Unique user IDs for anonymous session management
- No storage of sensitive data on servers
- Secure Firebase backend authentication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

- [alwalid54321](https://github.com/alwalid54321)

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [GenKit AI](https://genkit.ai/)
