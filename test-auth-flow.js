// Test script to verify authentication flow
console.log('Testing authentication flow...');

// Test 1: Check if localStorage is available
console.log('localStorage available:', typeof localStorage !== 'undefined');

// Test 2: Check current admin token
const currentToken = localStorage.getItem('adminToken');
console.log('Current admin token:', currentToken ? 'Present' : 'Not present');

// Test 3: Simulate login
function simulateLogin() {
  const testToken = 'test-token-' + Date.now();
  localStorage.setItem('adminToken', testToken);
  console.log('Simulated login - token set:', testToken);
  return testToken;
}

// Test 4: Simulate logout
function simulateLogout() {
  localStorage.removeItem('adminToken');
  console.log('Simulated logout - token removed');
}

// Test 5: Check authentication status
function checkAuthStatus() {
  const token = localStorage.getItem('adminToken');
  return !!token;
}

// Run tests
console.log('=== Authentication Flow Test ===');
console.log('Initial auth status:', checkAuthStatus());

const testToken = simulateLogin();
console.log('After login auth status:', checkAuthStatus());

simulateLogout();
console.log('After logout auth status:', checkAuthStatus());

console.log('=== Test Complete ==='); 