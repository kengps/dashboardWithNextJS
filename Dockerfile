# Stage 1: ติดตั้ง dependencies
FROM node:18-alpine AS deps

WORKDIR /app

COPY package*.json ./

# ตั้งค่า NODE_ENV เป็น development เพื่อให้ติดตั้ง devDependencies
ENV NODE_ENV=development
RUN npm ci

# Stage 2: สร้างไฟล์โปรเจกต์
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ตั้งค่า NODE_ENV เป็น production เพื่อสร้าง production build
ENV NODE_ENV=production
RUN npm run build

# Stage 3: รันโปรเจกต์ด้วย production build
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./static
COPY --from=builder /app/src/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
# ตั้งค่าตัวแปรสภาพแวดล้อม
ENV MY_PORT 3000

# รัน Next.js server
# CMD ["node", "server.js"]
CMD ["npm", "run", "start"]
# FROM node:18-alpine

# # ตั้งค่าโฟลเดอร์ทำงาน
# WORKDIR /app

# # คัดลอก package.json และ package-lock.json
# COPY package*.json ./

# # ติดตั้ง dependencies
# RUN npm install

# # คัดลอกโค้ดทั้งหมด
# COPY . .

# # รัน Next.js ในโหมดพัฒนา
# CMD ["npm", "run", "dev"]

# # Stage 1: ติดตั้ง dependencies
# FROM node:18-alpine AS deps

# # ตั้งค่าโฟลเดอร์ทำงาน
# WORKDIR /app

# # คัดลอก package.json และ package-lock.json
# COPY package*.json ./

# # ติดตั้ง production dependencies (ไม่รวม devDependencies)
# RUN npm install

# # Stage 2: สร้างไฟล์โปรเจกต์
# FROM node:18-alpine AS builder

# # ตั้งค่าโฟลเดอร์ทำงาน

# COPY . .
# # คัดลอกไฟล์ทั้งหมดที่จำเป็นจาก stage deps
# COPY --from=deps /app/node_modules ./node_modules


# # สร้างไฟล์สำหรับ production
# RUN npm run build

# # Stage 3: รันโปรเจกต์ด้วย production build
# FROM node:18-alpine AS runner

# # คัดลอกไฟล์ที่ถูก build เสร็จแล้วจาก stage builder
# COPY --from=builder /.next/standalone ./ 
# COPY --from=builder /.next/static ./static
# COPY --from=builder /src/public ./public
# COPY --from=builder /node_modules ./node_modules
# COPY --from=builder /package.json ./package.json

# EXPOSE 3000
# # ตั้งค่าตัวแปรสภาพแวดล้อม
# ENV MY_PORT 3000

# # รัน Next.js server
# CMD ["node", "server.js"





# ตั้งค่าโฟลเดอร์ทำงาน
# WORKDIR /app

# # คัดลอก package.json และ package-lock.json
# COPY package*.json ./

# # ติดตั้ง dependencies
# RUN npm install

# FROM node:18-alpine AS builder

# # คัดลอกโค้ดทั้งหมด
# COPY . .

# COPY --from=deps /node_modules ./node_modules

# RUN npm run build

# FROM node:18-alpine AS  runner

# COPY --from=builder /.next/standalone ./

# EXPOSE 3000

# ENV PORT 3000
# # รัน Next.js ในโหมดพัฒนา

# CMD HOSTNAME='0.0.0.0' node server.js


