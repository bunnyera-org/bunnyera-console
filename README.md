# BunnyEra Console

Web console for BunnyEra AI ecosystem.

## Features
- **Dashboard**: Real-time system overview.
- **Tasks**: View and manage task execution flow.
- **Logs**: Centralized log viewer with filtering.
- **Agents**: Monitor and configure registered agents.
- **Settings**: System configuration.

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React Icons

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## WebSocket Integration
The console connects to `ws://localhost:8080` by default. Update `NEXT_PUBLIC_BUNNYERA_GATEWAY_URL` in `.env` to change this.
Currently uses a mock data generator for prototyping.
