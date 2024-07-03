// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let data = [
    { id: 1, quantity: 100, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status: 'Pending', Impact: "High" },
    { id: 2, quantity: 10, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type2', actionNumber: '001', actionName: 'Action2', status: 'Pending', Impact: "Mid" },
    { id: 3, quantity: 120, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type1', actionNumber: '001', actionName: 'Action1', status: 'Pending', Impact: "Low" },
    { id: 4, quantity: 132, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type3', actionNumber: '001', actionName: 'Action3', status: 'Pending', Impact: "High" },
    { id: 5, quantity: 10, amount: 100, postingYear: 2020, postingMonth: 'January', actionType: 'Type2', actionNumber: '001', actionName: 'Action3', status: 'Pending', Impact: "Low" },
];

app.get('/data', (req, res) => {
    res.json(data);
});

app.post('/update', (req, res) => {
    const updatedRows = req.body;
    updatedRows.forEach(row => {
        const index = data.findIndex(item => item.id === row.id);
        if (index !== -1) {
            data[index] = { ...data[index], ...row };
        }
    });
    res.json({ success: true });
});

app.post('/add', (req, res) => {
    const newRow = req.body;
    data.push(newRow);
    res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
