class WebSocketService {
    constructor(url) {
        this.url = url;
        this.reconnectInterval = 5000;
        this.callbacks = {};
        this.connect();
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log('WebSocket connected');
        };

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("WebSocket message", message);

            if (this.callbacks[message.message_type]) {
                this.callbacks[message.message_type].forEach(callback => callback(message.message));
            }
        };

        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
            setTimeout(() => this.connect(), this.reconnectInterval);
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error', error);
            this.ws.close(); // Trigger the onclose event to reconnect
        };
    }

    registerCallback(messageType, callback) {
        if (!this.callbacks[messageType]) {
            this.callbacks[messageType] = [];
        }
        this.callbacks[messageType].push(callback);
    }

    unregisterCallback(messageType, callback) {
        if (this.callbacks[messageType]) {
            this.callbacks[messageType] = this.callbacks[messageType].filter(cb => cb !== callback);
        }
    }
}

export default WebSocketService;
