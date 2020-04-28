class CoreService {

    constructor() {
        this.currentDay = 0;
        // 14 days translates to 10 work days (otherwise a team of 10, for these rules, would be underforced)
        this.timeframeQuota = 10;
        this.users = this.generateUserList();
    }

    generateUserList(count = 10) {
        var users = [];
        for (let i = 0; i < count; i++) {
            users.push({
                name: `#${i}`,
                jobs: []
            });
        }
        return users;
    }

    electCandidates() {
        try {
            this.currentDay++;

            var potentialCandidates = this.users.filter(u => u.jobs.filter(j => j > this.currentDay - 10).length < 2),
                candidates = [];

            // Elect first candidate
            candidates.push(potentialCandidates[Math.floor(Math.random() * potentialCandidates.length)]);

            // Remove freshly added users from the potential potentialCandidates
            potentialCandidates = potentialCandidates.filter(u => !candidates.includes(u));

            // Elect first candidate
            candidates.push(potentialCandidates[Math.floor(Math.random() * potentialCandidates.length)]);

            // Update jobs for elected candidates
            candidates.forEach(u => u.jobs.push(this.currentDay));

            return this.users.filter(u => u.jobs.includes(this.currentDay));
        } catch (error) {
            // This fires when there aren't enough potential candidates to elect 2 persons
            return false;
        }
    }

    // Added this just to double-check the election's process validity
    fetchHistory() {
        var history = [];
        
        for (let i = 1; i <= this.currentDay; i++) {
            history.push(this.users.filter(u => u.jobs.includes(i)).map(u => u.name));
        }

        return history;
    }
}

module.exports = new CoreService();