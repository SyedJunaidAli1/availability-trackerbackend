# 🧾 Mentoring Call Scheduling System

A backend system for scheduling mentoring calls with **Role-Based Access Control (RBAC)**, built as part of an assignment.

---

# 🚀 Overview

This system allows:

- 👤 **Users** → Add availability & describe requirements
- 🧑‍🏫 **Mentors** → Add availability & define expertise
- 🛠 **Admins** →
  - View users & mentors
  - Get mentor recommendations
  - Book calls based on availability overlap

---

# 🧠 Core Features

- 🔐 JWT Authentication (No OAuth, simplified)
- 🧩 Role-Based Access Control (User / Mentor / Admin)
- 📅 Availability Management
- 🤖 Smart Mentor Recommendation System
- 📞 Call Booking with Time Overlap Detection

---

# 🛠 Tech Stack

- Node.js
- Express.js
- PostgreSQL (Neon)
- JWT Authentication
- pg (node-postgres)

---

# ⚙️ Setup Instructions

## 1. Clone Repository

```bash
git clone <your-repo-url>
cd backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Create `.env`

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 4. Run Server

```bash
npm run dev
# or
node server.js
```

---

## 5. Seed Database

```bash
node seed.js
```

---

# 🔐 Authentication

## POST `/api/auth/login`

Login using email & password.

### Body

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

### Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

# 👤 User APIs

## 1. Add Availability

### POST `/api/user/availability`

### Headers

```
Authorization: Bearer TOKEN
Content-Type: application/json
```

### Body

```json
{
  "date": "2026-04-02",
  "start_time": "10:00",
  "end_time": "12:00"
}
```

---

## 2. Get My Availability

### GET `/api/user/availability`

### Headers

```
Authorization: Bearer TOKEN
```

---

# 🧑‍🏫 Mentor APIs

## 1. Add Availability

### POST `/api/mentor/availability`

### Headers

```
Authorization: Bearer TOKEN
Content-Type: application/json
```

### Body

```json
{
  "date": "2026-04-02",
  "start_time": "11:00",
  "end_time": "13:00"
}
```

---

## 2. Get My Availability

### GET `/api/mentor/availability`

### Headers

```
Authorization: Bearer TOKEN
```

---

# 🛠 Admin APIs

## 1. Get All Users

### GET `/api/admin/users`

### Headers

```
Authorization: Bearer ADMIN_TOKEN
```

---

## 2. Get All Mentors

### GET `/api/admin/mentors`

### Headers

```
Authorization: Bearer ADMIN_TOKEN
```

---

## 3. Get Mentor Recommendations

### GET `/api/admin/recommendations/:userId`

### Headers

```
Authorization: Bearer ADMIN_TOKEN
```

### Example

```
GET /api/admin/recommendations/7
```

### Response

```json
[
  {
    "mentor": {
      "id": 2,
      "name": "Mentor 1",
      "email": "mentor1@test.com",
      "tags": ["tech", "big-company"],
      "description": "Worked at Google..."
    },
    "score": 6
  }
]
```

---

## 4. Book Call

### POST `/api/admin/book-call`

### Headers

```
Authorization: Bearer ADMIN_TOKEN
Content-Type: application/json
```

### Body

```json
{
  "userId": 7,
  "mentorId": 2,
  "call_type": "mock"
}
```

### Response

```json
{
  "message": "Call booked successfully",
  "call": {
    "id": 1,
    "user_id": 7,
    "mentor_id": 2,
    "call_type": "mock",
    "start_time": "2026-04-02T11:00:00.000Z",
    "end_time": "2026-04-02T12:00:00.000Z",
    "status": "scheduled"
  }
}
```

---

# 🧠 Recommendation Logic

Mentors are ranked using a **weighted matching system**:

- Tag similarity (strong signal)
- Description keyword matching
- Context-aware rules:
  - Resume → big-company mentors
  - Interview → mock-interview mentors
  - Guidance → communication mentors

---

# 📅 Booking Logic

- Finds overlapping availability between user & mentor
- Uses condition:

```
startA < endB && startB < endA
```

- Books the earliest matching slot

---

# 🔑 Dummy Credentials

## Admin

```
admin@test.com / 123456
```

## Mentors

```
mentor1@test.com / 123456
mentor2@test.com / 123456
```

## Users

```
user1@test.com / 123456
user2@test.com / 123456
```

---

# 🎯 Final Notes

- Email/notification system intentionally skipped for simplicity
- Focus is on **core scheduling logic and product flow**
- Designed to be **extensible and production-ready**

---

# 🚀 Status

✅ Backend Complete
✅ Fully Functional Scheduling Flow
✅ Ready for Demo / Submission
