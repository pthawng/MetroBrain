# MetroHCM: Advanced Operations Command & Control (OCC) System
> Real-time Monitoring & Management System for Ho Chi Minh City Metro Line 1.

---

## 🌐 Language / Ngôn ngữ
[English] | [Tiếng Việt](README.vi.md)

---

## 🌟 Mission & Vision

**MetroHCM** is a cutting-edge digital infrastructure designed to manage, operate, and optimize the Ho Chi Minh City Metro Line 1 (Ben Thanh - Suoi Tien). Our mission is to provide a **resilient, real-time, and high-fidelity monitoring infrastructure** that gives dispatchers and engineers a precise, millisecond-accurate view of the urban rail network.

- **Resilience**: High fault tolerance, ensuring 24/7 mission-critical operations.
- **Latency-Critical**: Low-latency execution for high-frequency telemetry data.
- **Precision**: Absolute accuracy in real-time positioning and state reporting.

---

## 🏗️ Architectural Overview

The system adheres to an **Event-Driven Architecture (EDA)** combined with **Domain-Driven Design (DDD)** to ensure scalability and maintainability.

```mermaid
graph TD
    subgraph "Simulation & Telemetry Layer"
        SE[Simulation Engine] --> |WebSocket/Protocol| B[Backend API]
    End

    subgraph "Core Data & Logic Layer"
        B --> |Prisma/SQL| DB[(PostgreSQL)]
        B --> |Socket.io| WS[Real-time Gateway]
    End

    subgraph "Observation & Control Layer"
        WS --> |Live Streaming| OF[Operate Front: Command Center]
        B --> |REST API| UF[User Front: Mobile App]
    End

    subgraph "External Integration"
        CT[CheckTicket Service] --> B
    End

    style B fill:#f96,stroke:#333,stroke-width:2px
    style OF fill:#00c,color:#fff,stroke-width:4px
```

---

## 📦 Core Modules

1.  **`backend`**: The "Heart" of the system - NestJS API Gateway handling data flows, authentication, and infrastructure resource management.
2.  **`operatefront`**: Operations Command Center (OCC) dashboard. Uses Mapbox GL JS to render train movements with 60 FPS interpolation.
3.  **`simulation-engine`**: Movement and telemetry simulation tool, acting as the "digital twin" of the physical system.
4.  **`userfront`**: Consumer-facing interface for passengers, providing real-time route information and station status.
5.  **`checkTicket`**: Ticketing control and passenger flow management system at ticket gates.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Backend** | NestJS, TypeScript, Prisma, Socket.io |
| **Frontend** | React, Vite, Zustand, TailwindCSS, MapboxGL |
| **Database** | PostgreSQL, Redis (Caching L2) |
| **Simulation** | Node.js, RxJS (Stream processing) |
| **Infrastructure** | Docker, Kubernetes (K8s), Prometheus/Grafana |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v20.x or higher.
- **Docker**: For Database and Redis.

### 2. Configuration
Copy `.env.example` to `.env` in each module directory and update:
- `MAPBOX_ACCESS_TOKEN` (for `operatefront`)
- `DATABASE_URL` (for `backend`)

### 3. Installation & Setup
```bash
# Install dependencies
cd backend && npm install
cd ../operatefront && npm install
cd ../simulation-engine && npm install

# Run Development Mode
# 1. Start Backend
cd backend && npm run start:dev

# 2. Start Simulation Engine
cd simulation-engine && npm run start:dev

# 3. Start Command Center (Operate Front)
cd operatefront && npm run dev
```

---

## 🛡️ Engineering Excellence

The project strictly adheres to **Google L9 (Staff/Principal Engineer)** documentation and coding standards:
- **Type Safety**: 100% TypeScript with `strict: true`.
- **Atomic Operations**: Ensuring data integrity via complex transactions.
- **Observability**: Built-in Prometheus metrics and structured logging.
- **Performance**: Zero-GC leaks policy for real-time visualization.

---

## 📄 License
Copyright &copy; 2026 **MetroHCM Team**.

---

> [!IMPORTANT]
> All schema changes or WebSocket protocol updates must be reviewed by the Principal Architect before merging to `main`.
