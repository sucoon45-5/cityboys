const db = require('../config/db');
const QRCode = require('qrcode');

// Generate Unique Membership ID
const generateMemberId = () => {
    const prefix = 'CBM';
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${year}${random}`;
};

exports.registerMember = async (req, res) => {
    try {
        const { first_name, surname, phone, email, state_of_origin, lga, ward, voting_lga, home_address, political_party } = req.body;

        // Check if member exists
        const [existing] = await db.execute('SELECT id FROM members WHERE phone = ?', [phone]);
        if (existing.length > 0) {
            return res.status(400).json({ msg: 'Member with this phone number already exists' });
        }

        const membership_id = generateMemberId();
        
        // Generate QR Code data (for now just the ID)
        const qrData = JSON.stringify({ id: membership_id, name: `${first_name} ${surname}` });
        const qrCodeImage = await QRCode.toDataURL(qrData);

        const sql = `INSERT INTO members (first_name, surname, phone, email, state_of_origin, lga, ward, voting_lga, home_address, political_party, membership_id, qr_code) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        await db.execute(sql, [first_name, surname, phone, email, state_of_origin, lga, ward, voting_lga, home_address, political_party, membership_id, qrCodeImage]);

        res.status(201).json({ 
            msg: 'Registration successful', 
            membership_id,
            qr_code: qrCodeImage
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getMemberProfile = async (req, res) => {
    try {
        const [member] = await db.execute('SELECT * FROM members WHERE id = ?', [req.user.id]);
        if (member.length === 0) return res.status(404).json({ msg: 'Member not found' });
        res.json(member[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
