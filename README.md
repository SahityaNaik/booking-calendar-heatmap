# Booking Calendar Heatmap Dashboard

A React-based dashboard for hotel occupancy visualization and booking management.

## Project Overview
This application provides a 42-day calendar grid that visualizes room occupancy through a heatmap. It includes interactive date range selection and a detailed summary of guest stays for selected periods.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

## Functional Features
- **Occupancy Heatmap:** A dynamic grid displaying occupancy levels across a 42-day period.
- **Drag-to-Select:** Interactive selection of date ranges using mouse events (`onMouseDown`, `onMouseEnter`, `onMouseUp`).
- **Stay Details:** A dedicated panel that lists all bookings overlapping with the selected date range.
- **Data Integration:** Real-time calculation of occupancy and metrics from a JSON-based booking dataset.

## Tech Stack
- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (Reducer, Memo, State)
- **Data Source:** Local JSON
