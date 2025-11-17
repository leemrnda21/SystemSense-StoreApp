// Staff Login Credentials Documentation
// ====================================
// 
// STAFF LOGIN METHODS:
// 1. Email Address + PIN (Most Common)
// 2. Staff ID + PIN (Quick login on KDS devices)
//
// DEMO ACCOUNTS (for testing):
// 
// Manager Account:
// - Email: manager@example.com
// - PIN: 1234
// - Access: Dashboard, Settings, Reports, Staff Management
// 
// Hall Staff Account:
// - Email: hall@example.com
// - PIN: 1234
// - Access: Table Management, Orders, Customer Calls
// 
// Kitchen Staff Account (KDS):
// - Email: kitchen@example.com
// - PIN: 1234
// - Access: Kitchen Display System, Order Tracking, Delivery Confirmation
//
// ====================================
// PRODUCTION SETUP:
// 
// To add new staff members:
// 1. Navigate to Staff Management page
// 2. Click "+ Add Staff"
// 3. Enter staff details (name, email, PIN)
// 4. Assign role: Manager, Hall, or Kitchen
// 5. Set permissions and access levels
//
// PIN Requirements:
// - Minimum 4 digits
// - Should be numeric for fast entry on KDS devices
// - Can be reset by Manager only
//
// ====================================

export const STAFF_LOGIN_INFO = {
  methods: [
    {
      name: 'Email + PIN',
      description: 'Use email address and PIN for standard login',
      usage: 'Manager Portal, Hall Staff Dashboard',
    },
    {
      name: 'Staff ID + PIN',
      description: 'Quick numeric login for KDS devices',
      usage: 'Kitchen Display System (KDS)',
    },
  ],
  demoAccounts: [
    {
      role: 'Manager',
      email: 'manager@example.com',
      staffId: 'MGR-001',
      pin: '1234',
    },
    {
      role: 'Hall Staff',
      email: 'hall@example.com',
      staffId: 'HALL-001',
      pin: '1234',
    },
    {
      role: 'Kitchen Staff',
      email: 'kitchen@example.com',
      staffId: 'KIT-001',
      pin: '1234',
    },
  ],
}
