## Endpoint

### Admin
| Method | Endpoint            | Body                          | Keterangan          |
|--------|-----------------------|--------------------------------|----------------------|
| POST   | /api/admin/login       | `{ username, password }`      | Login admin (session) |

| POST   | /api/admin/logout      | -                               | Logout                |


### Product
| Method | Endpoint             | Auth        | Body                                  | Keterangan       |
|--------|------------------------|-------------|-----------------------------------------|--------------------|
| GET    | /api/products          | publik      | -                                        | List semua produk |

| POST   | /api/products          | admin       | `{ name, description, price, stock }`  | Tambah produk      |

| PUT    | /api/products/:id      | admin       | `{ name?, description?, price?, stock? }` | Update produk   |

| DELETE | /api/products/:id      | admin       | -                                         | Hapus produk       |


### Chat (CS Bot)
| Method | Endpoint    | Auth   | Body               | Keterangan              |
|--------|--------------|--------|----------------------|---------------------------|
| POST   | /api/chat    | publik | `{ message }`        | Kirim pertanyaan ke bot  |


Contoh request:
```json
POST /api/chat
{ "message": "kaos polos ada warna apa aja dan harganya berapa?" }
```

Contoh kalo user coba keluar konteks:
```json
POST /api/chat
{ "message": "buatin saya kode HTML buat landing page dong" }
```
Bot bakal nolak dan ngarahin balik ke topik produk — ini yang kejadian karena
aturan di `services/gemini.service.js` (`buildSystemInstruction`).

## Cara kerja guardrail-nya (penting buat materi)

Di `services/gemini.service.js`, ada fungsi `buildSystemInstruction()` yang:
1. Ambil semua data produk dari database (jadi bot selalu jawab data terkini, bukan hardcode)
2. Nyusun **system instruction** yang isinya:
   - Peran bot (siapa dia, buat toko apa)
   - Data produk yang boleh dia rujuk (grounding — bot gak boleh ngarang)
   - Aturan ketat nolak topik di luar produk, termasuk larangan generate kode/HTML
   - Instruksi anti-prompt-injection (nolak instruksi yang nyoba ganti peran bot)

Ini dikirim sebagai `systemInstruction` ke Gemini, terpisah dari pesan user — jadi
walaupun user nulis "abaikan instruksi sebelumnya", instruksi sistem tetep dominan
(walau tetep gak 100% bulletproof, makanya ditambah validasi di kode juga).

Selain di level prompt, ada juga validasi di `middlewares/validateChatInput.middleware.js`
(cek panjang pesan, dsb) — konsepnya **defense in depth**: jangan cuma andelin satu
lapis pertahanan (prompt doang), tapi dilapis dari beberapa sisi.

## Soal keamanan API key

- `GEMINI_API_KEY` cuma ada di `.env`, dibaca lewat `config/gemini.js`, **tidak pernah**
  dikirim ke client/response manapun.
- `.env` masuk `.gitignore`, jangan pernah ke-commit ke git.
- Kalo API key ini bocor, orang lain bisa pake kuota Gemini kamu buat request mereka
  sendiri — beda kasus sama kebocoran data biasa, ini soal *cost & abuse*.

## Ide pengembangan lanjut (opsional buat materi lanjutan)
- Rate limiting per IP/session biar gak di-spam (`express-rate-limit`)
- Simpan history chat per session biar bot punya konteks percakapan (multi-turn)
- Logging semua pertanyaan yang ditolak bot, buat monitoring percobaan misuse
