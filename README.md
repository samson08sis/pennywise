# 🪙 Pennywise - Expense Tracker App

Pennywise is a simple, secure, and modern expense tracking application designed to help users manage their personal finances effortlessly. Built with Next.js (App Router) and TypeScript, it features secure cookie-based authentication, real-time data filtering, and visual expense summaries.

---

## ✨ Features

### 🔒 Authentication & Security

- **Sign Up & Log In**: Secure account creation and login.
- **JWT in HTTP-Only Cookies**: Keeps session tokens secure against XSS attacks.
- **Password Management**: Update existing passwords or reset forgotten ones.
- **Protected Routes**: All financial data and operations are restricted to authenticated users.

### 📊 Expense Management

- **Dashboard Summary**: Visual insight into total spending via an interactive donut chart.
- **CRUD Operations**: Easily create, read, edit, and delete expense items.
- **Custom Access Control**: Users can only access, modify, or delete their own expenses.
- **Filtering & Sorting**: Sort by date, amount, category, or field, with support for paginated results.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State & Auth**: HTTP-Only Cookie JWT Authentication

---

## 🚀 Getting Started

Follow these steps to set up and run Pennywise locally on your machine.

### Prerequisites

Make sure you have Node.js installed (v18 or higher recommended).

### 1. Clone the Repository

```bash
git clone [https://github.com/samson08sis/pennywise.git](https://github.com/samson08sis/pennywise.git)
cd pennywise
```
