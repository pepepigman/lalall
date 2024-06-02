// Update with your Ngrok URL
const serverUrl = 'https://lalall-jet.vercel.app/';

// Function to create a wallet
async function createWallet() {
    try {
        const response = await fetch(`${serverUrl}/create-wallet`, { method: 'POST' });
        const data = await response.json();
        console.log('Wallet created:', data);
        alert(`New Wallet Created!\nPublic Key: ${data.publicKey}`);
        localStorage.setItem('walletPublicKey', data.publicKey);
        updateUI();
    } catch (error) {
        console.error('Error creating wallet:', error);
    }
}

// Function to import a wallet
async function importWallet() {
    const secretKey = prompt('Enter your secret key (comma-separated):');
    try {
        const response = await fetch(`${serverUrl}/import-wallet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secretKey: secretKey.split(',').map(Number) })
        });
        const data = await response.json();
        console.log('Wallet imported:', data);
        alert(`Wallet Imported!\nPublic Key: ${data.publicKey}`);
        localStorage.setItem('walletPublicKey', data.publicKey);
        updateUI();
    } catch (error) {
        console.error('Error importing wallet:', error);
    }
}
