# tracking-app-backend

Backend theo dõi vị trí GPS thời gian thực. Thiết bị gửi tọa độ qua HTTP, server phát ngay vị trí đó tới mọi client đang kết nối qua Socket.IO (ví dụ một bản đồ viết bằng Angular).

```
Thiết bị GPS ──POST /gps──▶ NestJS ──emit "gps-update"──▶ Client (Socket.IO)
```

## Công nghệ

NestJS 11, Socket.IO (`@nestjs/websockets`), TypeScript.

## Chạy

Cần Node.js 20 trở lên.

```bash
npm install
npm run start:dev   # http://localhost:3001, tự restart khi sửa code
```

## API

### `POST /gps`: gửi vị trí

```bash
curl -X POST http://localhost:3001/gps \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"bike-01","lat":21.0285,"lng":105.8542,"speed":32}'
```

| Trường | Kiểu | Bắt buộc | Ghi chú |
|---|---|---|---|
| `deviceId` | string | có | Mã thiết bị |
| `lat`, `lng` | number | có | Vĩ độ, kinh độ |
| `speed` | number | không | km/h, mặc định `0` |

Server trả lại payload đã kèm `timestamp` (ms) và phát nó tới các client.

### Socket.IO event `gps-update`

```ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');
socket.on('gps-update', (p) => {
  // p = { deviceId, lat, lng, speed, timestamp }
  console.log(p);
});
```

## Cấu trúc

```
src/
├── main.ts              # Khởi động server, cổng 3001, bật CORS
└── gps/
    ├── gps.controller.ts  # POST /gps
    ├── gps.service.ts     # Gắn timestamp, chuyển cho gateway
    ├── gps.gateway.ts     # Socket.IO, phát event "gps-update"
    └── gps.dto.ts         # Kiểu dữ liệu đầu vào
```
