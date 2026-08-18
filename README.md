## Endpoint

### Admin
| Method | Endpoint            | Body                          | Keterangan          |
|--------|-----------------------|--------------------------------|----------------------|
| POST   | /api/admin/login       | `{ username, password }`      | Login admin (session) |
| POST   | /api/admin/logout      | -                               | Logout                |
<img width="845" height="554" alt="image" src="https://github.com/user-attachments/assets/c2e949e8-7b7f-4ff8-b454-30c80030a77c" />
<img width="844" height="554" alt="image" src="https://github.com/user-attachments/assets/b9da7078-547c-40af-ac39-9fc930981f04" />

### Product
| Method | Endpoint             | Auth        | Body                                  | Keterangan       |
|--------|------------------------|-------------|-----------------------------------------|--------------------|
| GET    | /api/products          | publik      | -                                        | List semua produk |
| POST   | /api/products          | admin       | `{ name, description, price, stock }`  | Tambah produk      |
| PUT    | /api/products/:id      | admin       | `{ name?, description?, price?, stock? }` | Update produk   |
| DELETE | /api/products/:id      | admin       | -                                         | Hapus produk       |
<img width="836" height="559" alt="image" src="https://github.com/user-attachments/assets/85f45efb-0e43-413a-9507-8d14780e17b9" />
<img width="1134" height="548" alt="image" src="https://github.com/user-attachments/assets/bcbd1f49-26a5-4239-9806-61a97bd7ca77" />
<img width="1145" height="552" alt="image" src="https://github.com/user-attachments/assets/77daa73d-29d8-43f3-a807-3bf0418584bd" />
<img width="1142" height="549" alt="image" src="https://github.com/user-attachments/assets/abaf8b4e-df7b-4423-aadb-73562b0f7d62" />

### Chat (CS Bot)
| Method | Endpoint    | Auth   | Body               | Keterangan              |
|--------|--------------|--------|----------------------|---------------------------|
| POST   | /api/chat    | publik | `{ message }`        | Kirim pertanyaan ke bot  |
<img width="1144" height="549" alt="image" src="https://github.com/user-attachments/assets/86076e7c-fb33-4ff8-b01a-a7c71cdf1d90" />
<img width="1151" height="561" alt="image" src="https://github.com/user-attachments/assets/c1a8b53d-a9ed-4e63-8f5c-251d67623506" />

### Tampilan
<img width="1358" height="695" alt="image" src="https://github.com/user-attachments/assets/d84d80fa-a602-4aae-b342-70d2d53f22a0" />

