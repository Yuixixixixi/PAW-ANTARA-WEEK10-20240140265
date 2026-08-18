const { askGemini } = require('../services/gemini.service');
const { ChatHistory } = require('../models');
const sendResponse = require('../utils/response');

async function chat(req, res) {
  try {
    const { message, saveHistory } = req.body;

    // 1. Panggil Gemini AI
    const reply = await askGemini(message);

    let savedChat = null;

    // 2. Simpan ke DB HANYA jika saveHistory bernilai true
    if (saveHistory === true) {
      savedChat = await ChatHistory.create({
        userMessage: message,
        botReply: reply,
        sessionId: req.sessionID || null,
      });
    }

    return sendResponse(res, {
      message: 'Berhasil dapat balasan',
      data: {
        reply,
        savedHistory: !!savedChat,
        historyData: savedChat,
      },
    });
  } catch (err) {
    console.error('Gemini error:', err.message);
    return sendResponse(res, {
      code: 500,
      success: false,
      message: 'Gagal menghubungi AI, coba lagi nanti',
    });
  }
}

// Endpoint GET untuk mengambil seluruh riwayat percakapan
async function getHistory(req, res) {
  try {
    const history = await ChatHistory.findAll({
      order: [['createdAt', 'ASC']],
    });

    return sendResponse(res, {
      message: 'Berhasil mengambil riwayat percakapan',
      data: history,
    });
  } catch (err) {
    return sendResponse(res, {
      code: 500,
      success: false,
      message: err.message,
    });
  }
}

module.exports = { chat, getHistory };