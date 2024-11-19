const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Kullanıcı Kaydı
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcı zaten var mı kontrol et
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Şifreyi hashle
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Yeni kullanıcı oluştur
        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Kullanıcı Girişi
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı bul
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Geçersiz email veya şifre' });
        }

        // Şifreyi kontrol et
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Geçersiz email veya şifre' });
        }

        // JWT token oluştur
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Şifre Değiştirme
router.post('/change-password', async (req, res) => {
    try {
        const { userId } = req.user; // From auth middleware
        const { oldPassword, newPassword } = req.body;

        // Kullanıcıyı bul
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Eski şifreyi kontrol et
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Mevcut şifre yanlış' });
        }

        // Yeni şifreyi hashle
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Şifreyi güncelle
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Şifre başarıyla değiştirildi' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

// Çıkış Yap
router.post('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.json({ message: 'Başarıyla çıkış yapıldı' });
});

// Kullanıcı Kontrolü
router.get('/check-auth', async (req, res) => {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ authenticated: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ authenticated: false });
        }

        res.json({
            authenticated: true,
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        res.status(401).json({ authenticated: false });
    }
});

module.exports = router;
