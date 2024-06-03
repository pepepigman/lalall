const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Keypair, Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram, LAMPORTS_PER_SOL } = require('@solana/web3.js');

const app = express();
const port = process.env.PORT || 3000;

// Fetch the secret key from environment variables
const secretKey = JSON.parse(process.env.SOLANA_SECRET_KEY);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.post('/create-wallet', (req, res) => {
    try {
        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        const secretKey = Array.from(keypair.secretKey);

        res.json({ publicKey, secretKey });
    } catch (error) {
        console.error('Error creating wallet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/import-wallet', (req, res) => {
    try {
        const { secretKey } = req.body;
        const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
        const publicKey = keypair.publicKey.toBase58();

        res.json({ publicKey });
    } catch (error) {
        console.error('Error importing wallet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/buy-token', async (req, res) => {
    try {
        const { walletPublicKey, tokenAddress, amount } = req.body;

        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const payerKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));

        let transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: payerKeypair.publicKey,
                toPubkey: new PublicKey(tokenAddress),
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        let signature = await connection.sendTransaction(transaction, [payerKeypair]);
        await connection.confirmTransaction(signature);

        res.json({ success: true, signature });
    } catch (error) {
        console.error('Error buying token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
