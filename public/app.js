const serverUrl = 'https://lalal-xjv7.vercel.app/';

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

// Function to update UI based on wallet presence
function updateUI() {
    const walletPublicKey = localStorage.getItem('walletPublicKey');
    if (walletPublicKey) {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('main-screen').classList.remove('hidden');
        document.getElementById('wallet-public-key').innerText = walletPublicKey;
    } else {
        document.getElementById('start-screen').classList.remove('hidden');
        document.getElementById('main-screen').classList.add('hidden');
    }
}

// Navigation functions
function showQuickBuy() {
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('quick-buy-screen').classList.remove('hidden');
}

function showDashboard() {
    // Implement the logic for showing the dashboard screen
}

function showMainScreen() {
    document.getElementById('quick-buy-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}

// Initial UI update on page load
window.onload = updateUI;
