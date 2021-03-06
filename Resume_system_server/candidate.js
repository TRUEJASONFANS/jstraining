var id = 0;
function nextId() {
    id++;
    return 'c' + id;
}
class Candidate {
    constructor(name, university, degree, phone) {
        this.id = nextId();
        this.name = name;
        this.university = university;
        this.degree = degree;
        this.phone = phone;
    }
}
module.exports = {
    getCandidates: () => {
        return candidates;
    },

    getCandidate: (id) => {
        console.log(id);
        var i;
        for (i = 0; i < candidates.length; i++) {
            console.log(`candidates[i].id is ${candidates[i].id}`);
            if (candidates[i].id === id) {
                console.log("yes");
                return candidates[i];
            } else {
                console.log("no");
            }
        }
        return null;
    },

    updateCandidate: (id, key, value) => {
        console.log("key :" + key + " value:" + value);
        for (i = 0; i < candidates.length; i++) {
            if (candidates[i].id === id) {
                console.log("yes");
                if (candidates[i][key]) {
                    candidates[i][key] = value;
                }
                return candidates[i];
            }
        }
        return null;
    },

    createCandidate: (name, university, degree, phone) => {
        var c = new Candidate(name, university, degree, phone);
        candidates.push(c);
        return c;
    },

    deleteCandidate: (id) => {
        var
            index = -1,
            i;
        for (i = 0; i < candidates.length; i++) {
            if (candidates[i].id === id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            // remove candidates[index]:
            return candidates.splice(index, 1)[0];
        }
        return null;
    }
};
var candidates = [
    new Candidate('john', '五道口', '本科', 6800053333),
    new Candidate('sunny', '蓝翔', '本科', 5887878877),
    new Candidate('jack', '新东方烹饪', '硕士', 875454578)
];