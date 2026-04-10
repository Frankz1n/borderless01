import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, existsSync } from 'fs';

const SERVICE_ACCOUNT_PATH = './serviceAccountKey.json';

if (!existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error('❌ ERRO: O arquivo "serviceAccountKey.json" não foi encontrado na raiz do projeto!');
  console.log('\n--- COMO RESOLVER ---');
  console.log('1. Vá no Console do Firebase (Configurações do Projeto > Contas de Serviço)');
  console.log('2. Clique em "Gerar nova chave privada"');
  console.log('3. Salve o arquivo gerado na raiz deste projeto com o nome exato "serviceAccountKey.json"');
  console.log('4. Rode este script novamente.');
  process.exit(1);
}

// Carregar chave gerada no painel do Firebase
const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const auth = getAuth();
const db = getFirestore();

async function syncUsers() {
  console.log('🚀 Iniciando sincronização de usuários do Authentication para o Firestore...\n');
  
  let nextPageToken;
  let successCount = 0;
  let skipCount = 0;

  try {
    // Lista os usuários em lotes de até 1000 por vez
    do {
      const listUsersResult = await auth.listUsers(1000, nextPageToken);
      
      for (const userRecord of listUsersResult.users) {
        const userRef = db.collection('users').doc(userRecord.uid);
        
        // Verifica se o usuário já existe na tabela/collection para evitar perda de dados e sobreposições
        const docSnap = await userRef.get();
        
        if (!docSnap.exists) {
          await userRef.set({
            name: userRecord.displayName || 'Sem nome informado',
            email: userRecord.email,
            createdAt: userRecord.metadata.creationTime ? new Date(userRecord.metadata.creationTime).toISOString() : new Date().toISOString()
          });
          console.log(`✅ Usuário copiado: ${userRecord.email}`);
          successCount++;
        } else {
          console.log(`⏩ Usuário já existe na tabela (ignorado): ${userRecord.email}`);
          skipCount++;
        }
      }
      
      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    console.log(`\n🎉 Sincronização concluída!`);
    console.log(`- ${successCount} usuários novos foram adicionados na tabela users.`);
    console.log(`- ${skipCount} usuários já existiam e foram ignorados.`);
  } catch (error) {
    console.error('❌ Erro inesperado na sincronização:', error);
  }
}

syncUsers();
