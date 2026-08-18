const express = require('express');
const router = express.Router();
const validateChatInput = require('../middlewares/validateChatInput.middleware');
const { chat, getHistory } = require('../controllers/chat.controller');

// POST /api/chat - Kirim pesan & simpan jika saveHistory = true
router.post('/', validateChatInput, chat);

// GET /api/chat/history - Mengambil daftar riwayat percakapan
router.get('/history', getHistory);

module.exports = router;