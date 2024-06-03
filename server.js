const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Keypair } = require('@solana/web3.js');

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

// Endpoint to buy tokens
app.post('/buy-tokens', async (req, res) => {
    const { tokenAddress, amount, walletPublicKey } = req.body;
    try {
        // Logic to buy tokens
        // Create, sign, and send a transaction to the Solana blockchain
        // This is a placeholder. Actual implementation will vary based on the token and contract
        // Assume a function `buyTokens` handles this logic

        await buyTokens(tokenAddress, amount, walletPublicKey);

        res.json({ success: true });
    } catch (error) {
        console.error('Error buying tokens:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Endpoint to sell tokens
app.post('/sell-tokens', async (req, res) => {
    const { tokenAddress, amount, walletPublicKey } = req.body;
    try {
        // Logic to sell tokens
        // Create, sign, and send a transaction to the Solana blockchain
        // This is a placeholder. Actual implementation will vary based on the token and contract
        // Assume a function `sellTokens` handles this logic

        await sellTokens(tokenAddress, amount, walletPublicKey);

        res.json({ success: true });
    } catch (error) {
        console.error('Error selling tokens:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});


// Catch-all to serve index.html for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
