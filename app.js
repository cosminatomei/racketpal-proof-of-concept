var express = require('express');
var app = express();

// Services
var _core = require('./services/core.service');

// This is the the simplest Express app for the sake of the exercise.
// Each call generates a new "day"/election
app.get('/', (req, res) => {
    var candidates = _core.electCandidates(),
        history = _core.fetchHistory();

    res.status(200).json({
        day: _core.currentDay,
        candidates,
        // Uncomment the following line to see the election history until this point
        // history
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});