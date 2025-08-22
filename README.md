# Frontend Take-Home Challenge

## 📋 Overview

This project is a frontend application that allows users to search for vehicles by ZIP code, filter and sort results, and explore vehicle details in a responsive and intuitive UI. The design is inspired by [flexcar.com/inventory](https://flexcar.com/inventory).

The application is built using React, Vite, TypeScript, and ShadCN UI, with React-Virtuoso for optimized rendering of large lists. Vitest is used for unit testing.

## ✅ Features

### ZIP Code Search

- Input for users to enter a ZIP code.
- Displays a list of vehicles available in the provided ZIP code.
- Vehicle data is hardcoded; no external API calls.

### Vehicle Details

Each vehicle card displays:

- Make
- Model
- Trim
- Year
- Color
- Mileage
- Price
- Image

### Filtering

Users can filter vehicles by:

- Make
- Color

### Sorting

Users can sort results by:

- Price (High → Low)
- Price (Low → High)
- Year

### User Interface

- Responsive design compatible across devices.
- Theme color: #101357.
- Filters appear on the left side of the screen.
- Large lists optimized with React-Virtuoso.

### Error Handling

Shows clear error messages for:

- Invalid or missing ZIP codes
- Empty search results

## 💻 Tech Stack

- **Frontend Framework**: React + Vite
- **Language**: TypeScript
- **UI Components**: ShadCN UI
- **List Optimization**: React-Virtuoso
- **Testing**: Vitest
- **Styling**: Tailwind CSS (via ShadCN)

## 🛠️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone git@github.com:mahetakaushik/Flex-car-task.git
   cd Flex-car-task

   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open the app in your browser:**
   ```
   http://localhost:5173
   ```

## 🧪 Running Tests

**For test coverage:**

```bash
npm run test:ci
```

## ⚙️ Design Decisions & Assumptions

- React-Virtuoso was chosen for performance when displaying large lists of vehicles.
- ShadCN UI used for consistent, responsive, and easily customizable UI components.
- Vehicle data is static, so no API integration is required.
- ZIP code validation ensures users input a valid 5-digit code.
- Filters for make and color only; sorting options cover price and year.
- Focused on mobile-first responsive design while ensuring a clean desktop layout.

## 📂 Project Structure

src/
├─ components/ # Reusable UI components
│ ├── **tests**/ # Component tests
│ └── ui/ # UI components
├─ data/ # Hardcoded vehicle data
├─ pages/ # Page components (e.g., SearchPage)
├─ lib/ # Utils functions and mock data
├─ App.tsx
└─ main.tsx

## ✅ Submission Notes

- Project is free of errors, warnings, and console debug logs.
- Include this README and the original assignment file in the root directory.
- Hosted in a public Git repository: `[https://github.com/mahetakaushik/Flex-car-task]`
