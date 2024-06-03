const serverUrl = 'https://lalall-jet.vercel.app/';

async function createWallet() {
    console.log('Creating wallet...');
    try {
        const response = await fetch(`${serverUrl}/api/create-wallet`, { method: 'POST' });
        const data = await response.json();
        console.log('Wallet created:', data);
        localStorage.setItem('walletPublicKey', data.publicKey);
        console.log('Wallet Public Key saved to local storage:', data.publicKey);
        updateUI();
    } catch (error) {
        console.error('Error creating wallet:', error);
        alert('Error creating wallet: ' + error.message);
    }
}

async function importWallet() {
    console.log('Importing wallet...');
    const secretKey = prompt('Enter your secret key (comma-separated):');
    try {
        const response = await fetch(`${serverUrl}/api/import-wallet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secretKey: secretKey.split(',').map(Number) })
        });
        const data = await response.json();
        console.log('Wallet imported:', data);
        localStorage.setItem('walletPublicKey', data.publicKey);
        console.log('Wallet Public Key saved to local storage:', data.publicKey);
        updateUI();
    } catch (error) {
        console.error('Error importing wallet:', error);
        alert('Error importing wallet: ' + error.message);
    }
}

async function buyToken(amount) {
    const tokenAddress = document.querySelector('.token-input').value;
    const walletPublicKey = localStorage.getItem('walletPublicKey');

    if (!tokenAddress || !walletPublicKey) {
        alert('Please provide a token address and make sure your wallet is set up.');
        return;
    }

    try {
        const response = await fetch(`${serverUrl}/api/buy-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletPublicKey, tokenAddress, amount }),
        });

        const data = await response.json();
        if (data.success) {
            alert(`Token purchased successfully! Transaction Signature: ${data.signature}`);
        } else {
            alert('Failed to purchase token.');
        }
    } catch (error) {
        console.error('Error purchasing token:', error);
        alert('Error purchasing token: ' + error.message);
    }
}

document.querySelector('.preset-button').addEventListener('click', () => buyToken(0.1));
