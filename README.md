# gRPC Address Book

This is a simple gRPC server built with TypeScript that demonstrates how to define and implement gRPC services using Protocol Buffers (`proto3`). The server allows you to:

- Add a `Person` with a name and age
- Retrieve a `Person` by their name

---

## 📦 Technologies Used

- Node.js
- TypeScript
- gRPC (`@grpc/grpc-js`)
- Protocol Buffers (`proto3`)
- `@grpc/proto-loader`

---

## 🛠️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Generate TypeScript types from proto

Generate TypeScript types from the .proto file and move the generated/ folder inside your /src directory:

```bash
./node_modules/@grpc/proto-loader/build/bin/proto-loader-gen-types.js  --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=generated ./src/a.proto
```

### 3. Build & Run the server

This script compiles your TypeScript project and runs the server from the dist/ directory:

```bash
npm run dev
```

The server will run on: `grpc://localhost:50051`

---

## 🧪 Example Requests (using Postman or gRPC client)

- Import the a.proto file to postman

### Add Person

- **URL**: `grpc://localhost:50051`
- **Method**: `AddressBookService/AddPerson`
- **Request**:
```json
{
  "name": "shyaminda",
  "age": 45
}
```

- **Response**:
```json
{
  "name": "shyaminda",
  "age": 45
}
```

---

### Get Person by Name

- **URL**: `grpc://localhost:50051`
- **Method**: `AddressBookService/GetPersonByName`
- **Request**:
```json
{
  "name": "shyaminda"
}
```

- **Response**:
```json
{
  "name": "shyaminda",
  "age": 45
}
```

---

## 📌 Notes

- This is an **in-memory implementation**, meaning all data will be lost on server restart.
- Type definitions for gRPC are generated using [`@grpc/proto-loader`](https://www.npmjs.com/package/@grpc/proto-loader).

---

## 🤝 License

MIT

---
