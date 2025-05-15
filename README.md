# TrackIQ Dashboard

TrackIQ Dashboard is a web application designed for tracking and managing operational data. It provides various views for network-level and site-specific metrics, including functionalities like "Wave Management" and "Outbound Sorter". The dashboard integrates with Power BI to display interactive reports.

The project was initially bootstrapped or inspired by `v0.dev`.

## Features

*   **Network Dashboard:** Overview of network-wide metrics.
*   **Site Dashboard:** Detailed metrics for selected sites.
*   **Wave Management:** Specific dashboard for managing "waves" (likely operational processes), displaying a Power BI report.
*   **Outbound Sorter:** Dashboard related to outbound sorting processes.
*   Collapsible sidebar for navigation.
*   Top bar for site selection and potentially other controls.
*   Dynamic content rendering based on selected navigation/route.

## Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) (v15+) with React (v19+)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI, using Lucide React for icons)
*   **Charting/Visualization:** [Recharts](https://recharts.org/), Embedded Power BI reports
*   **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
*   **Date Handling:** `date-fns`, `react-day-picker`
*   **Package Manager:** [pnpm](https://pnpm.io/)

## Project Structure

The project follows a standard Next.js (App Router) structure:

*   `app/`: Contains the core application routing, global styles (`globals.css`), root layout (`layout.tsx`), and main page (`page.tsx`).
*   `components/`: Houses reusable React components.
    *   `ui/`: Likely contains Shadcn UI generated components.
    *   `app-layout.tsx`: The main dashboard layout orchestrating the sidebar, top bar, and content area.
    *   `app-sidebar.tsx`: Navigation sidebar.
    *   `top-bar.tsx`: Top navigation/control bar.
    *   Specific dashboard components like `network-dashboard.tsx`, `site-dashboard.tsx`, `wave-management.tsx`, `outbound-sorter.tsx`.
*   `public/`: For static assets.
*   `lib/`: Utility functions or library code (if any specific ones are added).
*   `styles/`: Can contain additional global or specific styles.
*   `package.json`: Lists project dependencies and scripts.
*   `pnpm-lock.yaml`: pnpm lockfile.
*   `next.config.mjs`: Next.js configuration.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `tsconfig.json`: TypeScript configuration.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (version compatible with Next.js 15, e.g., v18.17 or later)
*   [pnpm](https://pnpm.io/installation) (can be installed via `npm install -g pnpm`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/GrayWandererr/track-iq.git
    cd track-iq
    ```

2.  **Install dependencies using pnpm:**
    ```bash
    pnpm install
    ```

### Running the Development Server

To start the development server (usually on `http://localhost:3000`):

```bash
pnpm dev
```

### Building for Production

To create a production build:

```bash
pnpm build
```

### Starting the Production Server

After building, to start the production server:

```bash
pnpm start
```

### Linting

To run the linter (ESLint, configured via Next.js):

```bash
pnpm lint
```

## Key Components

*   **`AppLayout` (`components/app-layout.tsx`):** This is the heart of the dashboard UI. It manages the overall structure, including the sidebar, top bar, and the main content area. It handles routing logic to display different dashboard views.
*   **`WaveManagement` (`components/wave-management.tsx`):** This component embeds a Power BI report for wave management. The current Power BI report ID is `15dbcfe8-2cd9-462f-aed9-46f5a2f8bd68`.

## Notes for New Developers

*   The UI is heavily based on Shadcn UI. Refer to its documentation for component usage and customization.
*   The project uses Tailwind CSS for styling. Familiarity with utility-first CSS will be helpful.
*   Navigation and content display logic is primarily managed within `AppLayout` and its child components (`AppSidebar`, `TopBar`).
*   Ensure your Power BI embedding settings (like `autoAuth=true` and the `ctid`) are appropriate for your environment if you intend to change or update the embedded reports.
*   The project name in `package.json` is `my-v0-project`, while the application title is "TrackIQ Dashboard". This could be aligned if desired.

This `README.md` should provide a good starting point for another developer. 