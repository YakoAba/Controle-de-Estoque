import { create, Client } from '@open-wa/wa-automate';
import fs from 'fs';

const SESSION_FILE_PATH = './session.json';

// Verifica se há uma sessão salva e carrega-a
const sessionData = fs.existsSync(SESSION_FILE_PATH) ? require(SESSION_FILE_PATH) : null;

// Cria uma nova instância do cliente com persistência de sessão
const client = create({
  sessionData,
  sessionId: 'my-session',
}).then((client) => {
  // Salva a sessão quando ela estiver pronta
  client.on('sessionData', (sessionData) => {
    console.log('Sessão do WhatsApp pronta');
    fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(sessionData));
  });

  // Usa o cliente conforme necessário
  // ...
  client.on('message', async (message) => {
    console.log(`Mensagem recebida de ${message.from}: ${message.body}`);
    await client.sendMessage(message.from, 'Olá! Obrigado por entrar em contato.');
  });
  return client;
}).catch((err) => {
  console.error(err);
});

export default client;
