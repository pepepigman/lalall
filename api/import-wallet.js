const { Keypair } = require('@solana/web3.js');

module.exports = async (req, res) => {
    try {
        const { secretKey } = req.body;
        const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
        const publicKey = keypair.publicKey.toBase58();

        res.status(200).json({ publicKey });
    } catch (error) {
        console.error('Error importing wallet:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
