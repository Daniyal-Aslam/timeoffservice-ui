# Time-Off Dashboard (Frontend)

A sleek, responsive **React + TypeScript** dashboard for managing employee leave. This frontend provides an intuitive interface for employees to check their balances and submit time-off requests, communicating directly with the Time-Off Service backend.

---

## Features

* **Balance Overview:** Real-time visualization of remaining leave days.
* **Request Submission:** Easy-to-use form for submitting time-off requests.
* **Data Synchronization:** Manual trigger to sync local UI state with the backend/HCM.
* **Theming:** Built-in support for **Dark and Light modes**.
* **Type Safety:** Fully typed with TypeScript for a robust development experience.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React](https://reactjs.org/) (TypeScript) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **UI Component Library** | [Ant Design (AntD)](https://ant.design/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |

---

## Setup & Installation

Ensure you have [Node.js](https://nodejs.org/) installed before proceeding.

### 1. Clone the Repository
```bash
git clone https://github.com/Daniyal-Aslam/timeoffservice-ui.git
cd timeoffservice-ui
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory to point the dashboard to your backend service:
```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## Running the Application

### Step 1: Verify Backend
Before starting the frontend, ensure the **Time-Off Service (Backend)** is running at `http://localhost:3000`. The dashboard relies on this API for all data.

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Access the Dashboard
Once the local server starts, open your browser to:
🔗 **URL:** `http://localhost:5174`

---

## Usage Guide

* **View Balances:** Upon entering your Employee ID and Location ID, the dashboard fetches current leave data.
* **Submit Requests:** Use the "Request Leave" modal. If the requested days exceed your balance, the system will return a **REJECTED** status based on backend validation.
* **Toggle Theme:** Use the theme switcher in the header to alternate between Light and Dark modes.

---

## Important Requirements

> **Backend Dependency:** This frontend is a consumer of the [Time-Off Service Backend](https://github.com/Daniyal-Aslam/timeoffservice). It will display errors or empty states if the backend (and its Mock HCM server) are not active.

| Service | Expected URL |
| :--- | :--- |
| **Backend API** | `http://localhost:3000` |
| **Frontend UI** | `http://localhost:5174` |

---

## Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **API Errors / Network Error** | Check if the `.env` file exists and the Backend is running. |
| **Styles not loading** | Ensure `npm install` finished correctly to include Ant Design assets. |
| **Port Conflict** | If `5174` is busy, Vite will choose another port; check the terminal output. |
