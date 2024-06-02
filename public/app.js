const serverUrl = 'https://lalall-jet.vercel.app/';

// Function to create a wallet
async function createWallet() {
    console.log('Creating wallet...');
    // Adding a visible change to ensure the latest code is running
    document.body.style.backgroundColor = '#ff0000'; // Change background color to red
    try {
        const response = await fetch(`${serverUrl}/create-wallet`, { method: 'POST' });
        const data = await response.json();
        console.log('Wallet created:', data);
        localStorage.setItem('walletPublicKey', data.publicKey);
        console.log('Wallet Public Key saved to local storage:', data.publicKey);
        updateUI();  // Ensure UI is updated after wallet creation
    } catch (error) {
        console.error('Error creating wallet:', error);
        alert('Error creating wallet: ' + error.message);
    }
}

// Function to import a wallet
async function importWallet() {
    console.log('Importing wallet...');
    const secretKey = prompt('Enter your secret key (comma-separated):');
    try {
        const response = await fetch(`${serverUrl}/import-wallet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secretKey: secretKey.split(',').map(Number) })
        });
        const data = await response.json();
        console.log('Wallet imported:', data);
        localStorage.setItem('walletPublicKey', data.publicKey);
        console.log('Wallet Public Key saved to local storage:', data.publicKey);
        updateUI();  // Ensure UI is updated after wallet import
    } catch (error) {
        console.error('Error importing wallet:', error);
        alert('Error importing wallet: ' + error.message);
    }
}

// Function to update UI based on wallet presence
function updateUI() {
    const walletPublicKey = localStorage.getItem('walletPublicKey');
    console.log('Updating UI. Wallet Public Key from local storage:', walletPublicKey);  // Debug log
    if (walletPublicKey) {
        console.log('Switching to main screen');
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('main-screen').classList.remove('hidden');
        document.getElementById('wallet-public-key').innerText = walletPublicKey;
    } else {
        console.log('Switching to start screen');
        document.getElementById('start-screen').classList.remove('hidden');
        document.getElementById('main-screen').classList.add('hidden');
    }
}

// Navigation functions
function showQuickBuy() {
    console.log('Showing Quick Buy screen');
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('quick-buy-screen').classList.remove('hidden');
}

function showDashboard() {
    console.log('Showing Dashboard screen');
    // Implement the logic for showing the dashboard screen
}

function showMainScreen() {
    console.log('Showing Main screen');
    document.getElementById('quick-buy-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}

// Initial UI update on page load
window.onload = function() {
    console.log('Window loaded, updating UI');
    updateUI();
};

// Fallback mechanism to force UI update after a delay (in case of timing issues)
setTimeout(updateUI, 2000);
