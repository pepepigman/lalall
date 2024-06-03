const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Keypair } = require('@solana/web3.js');
// Import necessary Solana Web3 modules
const { Connection, PublicKey, clusterApiUrl, Transaction, SystemProgram, LAMPORTS_PER_SOL } = require('@solana/web3.js');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Endpoint to create a new wallet
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

// Endpoint to import an existing wallet
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

        // Establish connection to the Solana devnet
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

        // Fetch the payer's wallet keypair from your secure storage
        const payerKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));

        // Define the transaction
        let transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: payerKeypair.publicKey,
                toPubkey: new PublicKey(tokenAddress),
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        // Sign and send the transaction
        let signature = await connection.sendTransaction(transaction, [payerKeypair]);

        // Confirm the transaction
        await connection.confirmTransaction(signature);

        res.json({ success: true, signature });
    } catch (error) {
        console.error('Error buying token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Catch-all to serve index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
