const { Keypair } = require('@solana/web3.js');

module.exports = async (req, res) => {
    try {
        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        const secretKey = Array.from(keypair.secretKey);

        res.status(200).json({ publicKey, secretKey });
    } catch (error) {
        console.error('Error creating wallet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
