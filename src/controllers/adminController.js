const db = require('../config/db');

// Manage Members
exports.getAllMembers = async (req, res) => {
    try {
        const [members] = await db.execute('SELECT * FROM members ORDER BY created_at DESC');
        res.json(members);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.approveMember = async (req, res) => {
    try {
        const { status } = req.body;
        await db.execute('UPDATE members SET status = ? WHERE id = ?', [status, req.params.id]);
        res.json({ msg: `Member ${status}` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Manage News
exports.createNews = async (req, res) => {
    try {
        const { title, content, image_url, author } = req.body;
        await db.execute('INSERT INTO news (title, content, image_url, author) VALUES (?, ?, ?, ?)', 
                        [title, content, image_url, author]);
        res.status(201).json({ msg: 'News article posted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Manage Events
exports.createEvent = async (req, res) => {
    try {
        const { title, event_date, location, description, image_url } = req.body;
        await db.execute('INSERT INTO events (title, event_date, location, description, image_url) VALUES (?, ?, ?, ?, ?)', 
                        [title, event_date, location, description, image_url]);
        res.status(201).json({ msg: 'Event created' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Analytics
exports.getStats = async (req, res) => {
    try {
        const [[{ totalMembers }]] = await db.execute('SELECT COUNT(*) as totalMembers FROM members');
        const [[{ pendingMembers }]] = await db.execute('SELECT COUNT(*) as pendingMembers FROM members WHERE status = "pending"');
        const [[{ totalEvents }]] = await db.execute('SELECT COUNT(*) as totalEvents FROM events');
        
        res.json({
            totalMembers,
            pendingMembers,
            totalEvents
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
