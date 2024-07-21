class WebSocketService {
    constructor(url) {
        this.url = url;
        this.ws = new WebSocket(url);
        this.callbacks = {};

        this.ws.onopen = () => {
            console.log('WebSocket connected');
        };

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("Websocket message", message);

            if (this.callbacks[message.message_type]) {
                this.callbacks[message.message_type].forEach(callback => callback(message.message));
            }
        };

        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        this.ws.onerror = (error) => {
            // TODO: better error handling
            console.error('WebSocket error', error);
        };
    }

    // TODO: check if callbacks stay even when switching site (ws stays open)
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
