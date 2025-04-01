const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const PORT = 5000;
app.use(cors());

// Doubly Linked List Node
class DLL {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

// LRU Cache Implementation
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new DLL(-1, -1);
        this.tail = new DLL(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this._deleteNode(node);
        this._insertAfterHead(node);
        return node.value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            this._deleteNode(node);
            node.value = value;
            this._insertAfterHead(node);
        } else {
            if (this.map.size >= this.capacity) {
                const lastNode = this.tail.prev;
                this._deleteNode(lastNode);
                this.map.delete(lastNode.key);
            }
            const newNode = new DLL(key, value);
            this._insertAfterHead(newNode);
            this.map.set(key, newNode);
        }
    }

    _insertAfterHead(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    _deleteNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
}

// Create separate caches for different types of radius calculations
const caches = {
    diameter: new LRUCache(10),
    circumference: new LRUCache(10),
    area: new LRUCache(10),
    "area-angle": new LRUCache(10),
    "sector-area": new LRUCache(10),
};

app.get('/calculate-radius', (req, res) => {
    const { type, value, angle } = req.query;
    if (!type || !value || !caches[type]) {
        return res.status(400).send('Missing required parameters or invalid type');
    }

    const cacheKey = angle ? `${value}-${angle}` : `${value}`;
    const cachedResult = caches[type].get(cacheKey);

    if (cachedResult !== -1) {
        console.log(`Cache hit for ${type}-${cacheKey}: ${cachedResult}`);
        return res.send(`Cached Radius: ${cachedResult}`);
    }

    console.log(`Cache miss for ${type}-${cacheKey}, calling Java program.`);
    let command = `java CircleRadiusCalculator ${type} ${value}`;
    if (angle) {
        command += ` ${angle}`;
    }

    exec(command, (error, stdout, stderr) => {
        if (error || stderr) {
            return res.status(500).send('Error executing Java program');
        }
        const result = stdout.trim();
        caches[type].put(cacheKey, result);
        console.log(`Stored ${type}-${cacheKey} in cache with value: ${result}`);
        res.send(`Radius: ${result}`);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
