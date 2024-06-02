const serverUrl = 'https://lalall-jet.vercel.app/';

// Function to create a wallet
async function createWallet() {
    console.log('Creating wallet...');
    alert('Creating wallet...');
    try {
        const response = await fetch(`${serverUrl}/create-wallet`, { method: 'POST' });
        const data = await response.json();
        console.log('Wallet created:', data);
        alert(`New Wallet Created!\nPublic Key: ${data.publicKey}`);
        localStorage.setItem('walletPublicKey', data.publicKey);
        alert('Wallet Public Key saved to local storage: ' + data.publicKey);
        updateUI();  // Ensure UI is updated after wallet creation
    } catch (error) {
        console.error('Error creating wallet:', error);
        alert('Error creating wallet: ' + error.message);
    }
}

// Function to import a wallet
async function importWallet() {
    console.log('Importing wallet...');
    alert('Importing wallet...');
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
        alert('Wallet Public Key saved to local storage: ' + data.publicKey);
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
    alert('Updating UI. Wallet Public Key from local storage: ' + walletPublicKey);  // Debug alert
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
    console.log('Showing Quick Buy screen');
    alert('Showing Quick Buy screen');  // Debug alert
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('quick-buy-screen').classList.remove('hidden');
}

function showDashboard() {
    console.log('Showing Dashboard screen');
    alert('Showing Dashboard screen');  // Debug alert
    // Implement the logic for showing the dashboard screen
}

function showMainScreen() {
    console.log('Showing Main screen');
    alert('Showing Main screen');  // Debug alert
    document.getElementById('quick-buy-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
}

// Initial UI update on page load
window.onload = function() {
    console.log('Window loaded');
    alert('Window loaded, updating UI');
    updateUI();
};

// Fallback mechanism to force UI update after a delay (in case of timing issues)
setTimeout(updateUI, 2000);
