const { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Keypair } = require('@solana/web3.js');

module.exports = async (req, res) => {
    try {
        const { walletPublicKey, tokenAddress, amount } = req.body;

        // Establish connection to the Solana devnet
        const connection = new Connection(process.env.SOLANA_CLUSTER || 'https://api.devnet.solana.com', 'confirmed');

        // Fetch the payer's wallet keypair from environment variables
        const secretKey = Uint8Array.from(JSON.parse(process.env.SECRET_KEY));
        const payerKeypair = Keypair.fromSecretKey(secretKey);

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

        res.status(200).json({ success: true, signature });
    } catch (error) {
        console.error('Error buying token:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
