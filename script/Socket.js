
let isSocket = null;

export default function Socket ({ onClose, onOpen, onMessage }) {
  if (isSocket) return;
  isSocket = true;

  const ws = new WebSocket('wss://api.skillstream.repl.co');

  ws.onmessage = evt => {
    onMessage(JSON.parse(evt.data));
  };

  ws.onclose = () => {
    isSocket = null;
    setTimeout(() => {
      Socket({ path, token, onClose, onOpen, onMessage });
    }, 1000);
    onClose();
  };
  
  ws.onopen = onOpen.bind(this, ws);
}