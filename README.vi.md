# MetroHCM: Hệ thống Trung tâm Điều hành và Giám sát Thời gian thực
> Tuyến Metro Số 1 TP. Hồ Chí Minh (Bến Thành - Suối Tiên).

---

## 🌐 Ngôn ngữ / Language
[Tiếng Việt] | [English](README.md)

---

## 🌟 Tầm nhìn & Sứ mệnh

**MetroHCM** là nền tảng hạ tầng kỹ thuật số tiên tiến nhất, được thiết kế để quản lý, điều hành và tối ưu hóa hoạt động của Tuyến Metro Số 1. Sứ mệnh của chúng tôi là cung cấp một lớp **hạ tầng giám sát kiên cố (resilient), thời gian thực (real-time), và độ trung thực cao (high-fidelity)** cho phép các điều độ viên và kỹ sư có cái nhìn chính xác đến từng mili-giây về toàn bộ mạng lưới đường sắt đô thị.

- **Resilience**: Khả năng chịu lỗi cao, đảm bảo hoạt động 24/7.
- **Latency-Critical**: Xử lý dữ liệu telemetry với độ trễ cực thấp.
- **Precision**: Độ chính xác tối đa trong định vị và báo cáo trạng thái.

---

## 🏗️ Kiến trúc Hệ thống

Hệ thống tuân thủ mô hình **Event-Driven Architecture (EDA)** kết hợp với **Domain-Driven Design (DDD)** nhằm đảm bảo tính mở rộng và dễ bảo trì.

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

## 📦 Các thành phần chính

1.  **`backend`**: "Trái tim" của hệ thống - NestJS API Gateway xử lý luồng dữ liệu, xác thực, và quản trị tài nguyên hạ tầng.
2.  **`operatefront`**: Dashboard điều hành Trung tâm (OCC). Sử dụng Mapbox GL JS để hiển thị chuyển động của đoàn tàu với độ mượt 60 FPS (nội suy).
3.  **`simulation-engine`**: Công cụ giả lập chuyển động và telemetry, đóng vai trò như "digital twin" của hệ thống thực tế.
4.  **`userfront`**: Giao diện hành khách, cung cấp thông tin lộ trình và tình trạng ga theo thời gian thực.
5.  **`checkTicket`**: Hệ thống kiểm soát vé và quản lý lưu lượng tại các cổng kiểm soát.

---

## 🛠️ Công nghệ sử dụng

| Lớp (Layer) | Công nghệ |
| :--- | :--- |
| **Backend** | NestJS, TypeScript, Prisma, Socket.io |
| **Frontend** | React, Vite, Zustand, TailwindCSS, MapboxGL |
| **Database** | PostgreSQL, Redis (Caching L2) |
| **Simulation** | Node.js, RxJS (Stream processing) |
| **Infrastructure** | Docker, Kubernetes (K8s), Prometheus/Grafana |

---

## 🚀 Hướng dẫn Triển khai

### 1. Yêu cầu hệ thống
- **Node.js**: Phiên bản 20.x trở lên.
- **Docker**: Để khởi chạy Database và Redis.

### 2. Cấu hình
Sao chép `.env.example` thành `.env` trong từng thư mục module và cập nhật:
- `MAPBOX_ACCESS_TOKEN` (cho `operatefront`)
- `DATABASE_URL` (cho `backend`)

### 3. Cài đặt & Khởi chạy
```bash
# Cài đặt phụ thuộc
cd backend && npm install
cd ../operatefront && npm install
cd ../simulation-engine && npm install

# Khởi chạy chế độ phát triển
# 1. Start Backend
cd backend && npm run start:dev

# 2. Start Simulation Engine
cd simulation-engine && npm run start:dev

# 3. Start Command Center (Operate Front)
cd operatefront && npm run dev
```

---

## 🛡️ Tiêu chuẩn Kỹ thuật

Dự án tuân thủ nghiêm ngặt các tiêu chuẩn **Staff/Principal Engineer Google (L9)**:
- **Type Safety**: 100% codebase sử dụng TypeScript với cấu hình `strict: true`.
- **Atomic Operations**: Đảm bảo tính nhất quán dữ liệu qua các transaction phức tạp.
- **Observability**: Hệ thống logging tập trung và metrics (Prometheus) tích hợp sẵn.
- **Performance**: Chính sách Zero-GC leaks cho các hiển thị thời gian thực.

---

## 📄 Giấy phép
Bản quyền &copy; 2026 **MetroHCM Team**.

---

> [!IMPORTANT]
> Mọi thay đổi về schema hoặc giao thức WebSocket phải được review bởi Principal Architect trước khi merge vào nhánh `main`.
