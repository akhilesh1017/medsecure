// Sample Data
const samplePatients = [
  { id: 1, name: 'Sarah Johnson', age: 34, gender: 'Female', blood_type: 'A+', phone: '+91-9876543210', email: 'sarah.j@email.com', address: '123 MG Road, Kollam, Kerala', emergency_contact: 'John Johnson (+91-9876543211)', health_score: 85, encryption_status: 'AES-256 Encrypted' },
  { id: 2, name: 'Rajesh Kumar', age: 56, gender: 'Male', blood_type: 'B+', phone: '+91-9876543220', email: 'rajesh.k@email.com', address: '456 Beach Road, Kollam, Kerala', emergency_contact: 'Priya Kumar (+91-9876543221)', health_score: 72, encryption_status: 'AES-256 Encrypted' },
  { id: 3, name: 'Priya Sharma', age: 28, gender: 'Female', blood_type: 'O+', phone: '+91-9876543230', email: 'priya.s@email.com', address: '789 Temple Street, Kollam, Kerala', emergency_contact: 'Amit Sharma (+91-9876543231)', health_score: 92, encryption_status: 'AES-256 Encrypted' }
];

const healthcareProviders = [
  { id: 1, name: 'Dr. Anil Menon', role: 'Cardiologist', department: 'Cardiology', experience: '15 years', email: 'dr.anil@hospital.com', phone: '+91-9876540001', specialization: 'Interventional Cardiology' },
  { id: 2, name: 'Nurse Mary Thomas', role: 'Senior Nurse', department: 'General Ward', experience: '8 years', email: 'mary.t@hospital.com', phone: '+91-9876540002', shift: 'Morning Shift (6 AM - 2 PM)' },
  { id: 3, name: 'Dr. Lakshmi Nair', role: 'Radiologist', department: 'Radiology', experience: '12 years', email: 'dr.lakshmi@hospital.com', phone: '+91-9876540003', specialization: 'MRI & CT Imaging' },
  { id: 4, name: 'Suresh Pillai', role: 'Lab Technician', department: 'Clinical Laboratory', experience: '6 years', email: 'suresh.p@hospital.com', phone: '+91-9876540004', specialization: 'Hematology & Biochemistry' }
];

const appointments = [
  { id: 1, patient: 'Sarah Johnson', doctor: 'Dr. Anil Menon', date: '2025-10-30', time: '10:00 AM', department: 'Cardiology', status: 'Confirmed', type: 'Follow-up' },
  { id: 2, patient: 'Rajesh Kumar', doctor: 'Dr. Lakshmi Nair', date: '2025-10-29', time: '2:30 PM', department: 'Radiology', status: 'Completed', type: 'MRI Scan' },
  { id: 3, patient: 'Priya Sharma', doctor: 'Dr. Anil Menon', date: '2025-11-02', time: '11:00 AM', department: 'Cardiology', status: 'Scheduled', type: 'Consultation' }
];

const labResults = [
  { id: 1, patient: 'Sarah Johnson', test_type: 'Complete Blood Count', date: '2025-10-25', status: 'Ready', technician: 'Suresh Pillai', encryption: 'SHA-256 Hash Verified', critical_values: false },
  { id: 2, patient: 'Rajesh Kumar', test_type: 'Lipid Profile', date: '2025-10-26', status: 'Ready', technician: 'Suresh Pillai', encryption: 'SHA-256 Hash Verified', critical_values: true },
  { id: 3, patient: 'Priya Sharma', test_type: 'Thyroid Function Test', date: '2025-10-27', status: 'Processing', technician: 'Suresh Pillai', encryption: 'Pending', critical_values: false }
];

const prescriptions = [
  { id: 1, patient: 'Sarah Johnson', doctor: 'Dr. Anil Menon', date: '2025-10-20', medication: 'Atorvastatin 20mg', dosage: 'Once daily', duration: '30 days', refills: 2, digital_signature: 'Verified' },
  { id: 2, patient: 'Rajesh Kumar', doctor: 'Dr. Anil Menon', date: '2025-10-22', medication: 'Metformin 500mg', dosage: 'Twice daily', duration: '60 days', refills: 3, digital_signature: 'Verified' }
];

const auditLogEntries = [
  { timestamp: '2025-10-28 09:15:23', user: 'Dr. Anil Menon', action: 'Accessed patient record', patient: 'Sarah Johnson', ip_address: '192.168.1.100', location: 'Kollam, Kerala', status: 'Success' },
  { timestamp: '2025-10-28 10:30:45', user: 'Nurse Mary Thomas', action: 'Updated vital signs', patient: 'Rajesh Kumar', ip_address: '192.168.1.102', location: 'Kollam, Kerala', status: 'Success' },
  { timestamp: '2025-10-28 11:20:10', user: 'Suresh Pillai', action: 'Entered lab results', patient: 'Priya Sharma', ip_address: '192.168.1.105', location: 'Kollam, Kerala', status: 'Success' },
  { timestamp: '2025-10-28 14:05:33', user: 'Unknown User', action: 'Failed login attempt', patient: 'N/A', ip_address: '45.123.45.67', location: 'Unknown Location', status: 'Blocked - Suspicious Activity' }
];

// Global State
let currentUser = null;
let currentUserRole = null;
let currentPage = 'home';
let encryptedData = '';
let encryptionKey = '';

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeAuthModal();
  populateAuditTable();
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});

// Navigation
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      scrollToSection(targetId);
      
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
  
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageId;
    window.scrollTo(0, 0);
  }
}

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
  }
}

// Authentication Modal
function initializeAuthModal() {
  const authTabs = document.querySelectorAll('.auth-tab');
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

function showAuthModal(role = null) {
  const modal = document.getElementById('authModal');
  modal.classList.add('active');
  
  if (role) {
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('data-tab') === role) {
        tab.classList.add('active');
      }
    });
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  modal.classList.remove('active');
}

function handleLogin(event) {
  event.preventDefault();
  
  const activeTab = document.querySelector('.auth-tab.active');
  const role = activeTab.getAttribute('data-tab');
  
  // Simulate login
  currentUserRole = role;
  
  if (role === 'patient') {
    currentUser = samplePatients[0];
    closeAuthModal();
    showPage('patient-dashboard');
    loadPatientDashboard();
  } else if (role === 'provider') {
    currentUser = healthcareProviders[0];
    closeAuthModal();
    showPage('provider-dashboard');
    loadProviderDashboard();
  } else if (role === 'tpa') {
    currentUser = { name: 'TPA Admin', role: 'Administrator' };
    closeAuthModal();
    showPage('tpa-dashboard');
    loadTPADashboard();
  } else if (role === 'admin') {
    currentUser = { name: 'System Admin', role: 'Administrator' };
    closeAuthModal();
    showPage('provider-dashboard');
    loadProviderDashboard();
  }
  
  showToast('Login successful! Welcome ' + currentUser.name);
}

function logout() {
  currentUser = null;
  currentUserRole = null;
  showPage('home');
  showToast('Logged out successfully');
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const icon = input.nextElementSibling.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Dashboard Views
function showDashboardView(viewId) {
  const breadcrumbText = document.getElementById('breadcrumbText') || document.getElementById('providerBreadcrumb') || document.getElementById('tpaBreadcrumb');
  if (breadcrumbText) {
    breadcrumbText.textContent = viewId.split('-').pop();
  }
  
  // Update sidebar active link
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + viewId) {
      link.classList.add('active');
    }
  });
  
  // Load view content based on role and view
  if (currentUserRole === 'patient') {
    loadPatientView(viewId);
  } else if (currentUserRole === 'provider') {
    loadProviderView(viewId);
  } else if (currentUserRole === 'tpa') {
    loadTPAView(viewId);
  }
}

// Patient Dashboard
function loadPatientDashboard() {
  loadPatientView('patient-overview');
}

function loadPatientView(viewId) {
  const content = document.getElementById('dashboardContent');
  
  if (viewId === 'patient-overview') {
    content.innerHTML = `
      <div class="welcome-banner">
        <h1>Welcome back, ${currentUser.name}!</h1>
        <p>Your health dashboard at a glance</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Health Score</div>
              <div class="stat-card-value">${currentUser.health_score}</div>
              <div class="stat-card-trend"><i class="fas fa-arrow-up"></i> +3% this month</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #28A745, #20C997);">
              <i class="fas fa-heartbeat"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Upcoming Appointments</div>
              <div class="stat-card-value">2</div>
              <div class="stat-card-trend"><i class="fas fa-calendar"></i> Next: Oct 30</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #0066CC, #00A896);">
              <i class="fas fa-calendar-check"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Lab Results</div>
              <div class="stat-card-value">1</div>
              <div class="stat-card-trend"><i class="fas fa-check-circle"></i> Ready to view</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #FFC107, #FF9800);">
              <i class="fas fa-flask"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Active Prescriptions</div>
              <div class="stat-card-value">1</div>
              <div class="stat-card-trend"><i class="fas fa-info-circle"></i> 2 refills left</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #667eea, #764ba2);">
              <i class="fas fa-prescription"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="data-table-container">
        <div class="table-header">
          <h3>Recent Activity</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Activity</th>
                <th>Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Oct 25, 2025</td>
                <td>Lab Test</td>
                <td>Complete Blood Count</td>
                <td><span class="badge badge-success">Completed</span></td>
              </tr>
              <tr>
                <td>Oct 20, 2025</td>
                <td>Prescription</td>
                <td>Atorvastatin 20mg</td>
                <td><span class="badge badge-info">Active</span></td>
              </tr>
              <tr>
                <td>Oct 15, 2025</td>
                <td>Appointment</td>
                <td>Dr. Anil Menon - Follow-up</td>
                <td><span class="badge badge-success">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'patient-records') {
    content.innerHTML = `
      <h2>Medical Records</h2>
      <div class="encryption-status-banner">
        <i class="fas fa-shield-alt"></i>
        <div>
          <strong>Encryption Status: ${currentUser.encryption_status}</strong>
          <p>All your medical records are encrypted with military-grade security</p>
        </div>
      </div>
      
      <div class="data-table-container" style="margin-top: 24px;">
        <div class="table-header">
          <h3>Your Medical Records</h3>
          <button class="btn btn-primary btn-sm"><i class="fas fa-download"></i> Download All</button>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Provider</th>
                <th>Encryption</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Oct 20, 2025</td>
                <td>Prescription</td>
                <td>Atorvastatin 20mg</td>
                <td>Dr. Anil Menon</td>
                <td><span class="badge badge-success"><i class="fas fa-lock"></i> Encrypted</span></td>
                <td><button class="btn btn-outline btn-sm"><i class="fas fa-eye"></i> View</button></td>
              </tr>
              <tr>
                <td>Oct 15, 2025</td>
                <td>Visit Summary</td>
                <td>Cardiology Follow-up</td>
                <td>Dr. Anil Menon</td>
                <td><span class="badge badge-success"><i class="fas fa-lock"></i> Encrypted</span></td>
                <td><button class="btn btn-outline btn-sm"><i class="fas fa-eye"></i> View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'patient-appointments') {
    content.innerHTML = `
      <h2>Appointments</h2>
      <button class="btn btn-primary" style="margin-bottom: 24px;"><i class="fas fa-plus"></i> Book New Appointment</button>
      
      <div class="data-table-container">
        <div class="table-header">
          <h3>Your Appointments</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${appointments.filter(apt => apt.patient === currentUser.name).map(apt => `
                <tr>
                  <td>${apt.date}</td>
                  <td>${apt.time}</td>
                  <td>${apt.doctor}</td>
                  <td>${apt.department}</td>
                  <td>${apt.type}</td>
                  <td><span class="badge badge-${apt.status === 'Confirmed' ? 'success' : apt.status === 'Scheduled' ? 'warning' : 'info'}">${apt.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'patient-lab') {
    content.innerHTML = `
      <h2>Lab Results</h2>
      
      <div class="data-table-container">
        <div class="table-header">
          <h3>Your Lab Results</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Test Type</th>
                <th>Technician</th>
                <th>Status</th>
                <th>Encryption</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${labResults.filter(lab => lab.patient === currentUser.name).map(lab => `
                <tr>
                  <td>${lab.date}</td>
                  <td>${lab.test_type}</td>
                  <td>${lab.technician}</td>
                  <td><span class="badge badge-${lab.status === 'Ready' ? 'success' : 'warning'}">${lab.status}</span></td>
                  <td><span class="badge badge-success"><i class="fas fa-shield-alt"></i> ${lab.encryption}</span></td>
                  <td><button class="btn btn-outline btn-sm" ${lab.status !== 'Ready' ? 'disabled' : ''}><i class="fas fa-download"></i> Download</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'patient-prescriptions') {
    content.innerHTML = `
      <h2>Prescriptions</h2>
      
      <div class="data-table-container">
        <div class="table-header">
          <h3>Active Prescriptions</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Duration</th>
                <th>Refills</th>
                <th>Doctor</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              ${prescriptions.filter(rx => rx.patient === currentUser.name).map(rx => `
                <tr>
                  <td>${rx.date}</td>
                  <td>${rx.medication}</td>
                  <td>${rx.dosage}</td>
                  <td>${rx.duration}</td>
                  <td>${rx.refills}</td>
                  <td>${rx.doctor}</td>
                  <td><span class="badge badge-success"><i class="fas fa-check-circle"></i> ${rx.digital_signature}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'patient-consent') {
    content.innerHTML = `
      <h2>Privacy & Consent Management</h2>
      
      <div class="demo-card">
        <h3><i class="fas fa-user-shield"></i> Data Sharing Consent</h3>
        <p>Control who can access your medical information</p>
        
        <div style="margin-top: 24px;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: var(--color-bg-light); border-radius: 8px; margin-bottom: 12px;">
            <div>
              <strong>Share data with healthcare providers</strong>
              <p style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0 0;">Allow doctors and nurses to access your records</p>
            </div>
            <label class="checkbox-label">
              <input type="checkbox" checked>
              <span>Enabled</span>
            </label>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: var(--color-bg-light); border-radius: 8px; margin-bottom: 12px;">
            <div>
              <strong>Emergency access</strong>
              <p style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0 0;">Allow emergency personnel to access vital information</p>
            </div>
            <label class="checkbox-label">
              <input type="checkbox" checked>
              <span>Enabled</span>
            </label>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: var(--color-bg-light); border-radius: 8px;">
            <div>
              <strong>Share with insurance providers</strong>
              <p style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0 0;">Allow insurance companies to access claim-related data</p>
            </div>
            <label class="checkbox-label">
              <input type="checkbox">
              <span>Disabled</span>
            </label>
          </div>
        </div>
        
        <button class="btn btn-primary" style="margin-top: 24px;"><i class="fas fa-save"></i> Save Preferences</button>
      </div>
    `;
  }
}

// Provider Dashboard
function loadProviderDashboard() {
  loadProviderView('provider-overview');
}

function loadProviderView(viewId) {
  const content = document.getElementById('providerContent');
  
  if (viewId === 'provider-overview') {
    content.innerHTML = `
      <div class="welcome-banner">
        <h1>Welcome, ${currentUser.name}</h1>
        <p>${currentUser.role} - ${currentUser.department}</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Patients Today</div>
              <div class="stat-card-value">8</div>
              <div class="stat-card-trend"><i class="fas fa-arrow-up"></i> +2 from yesterday</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #0066CC, #00A896);">
              <i class="fas fa-users"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Appointments</div>
              <div class="stat-card-value">5</div>
              <div class="stat-card-trend"><i class="fas fa-clock"></i> Next at 2:00 PM</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #667eea, #764ba2);">
              <i class="fas fa-calendar-check"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Prescriptions Written</div>
              <div class="stat-card-value">12</div>
              <div class="stat-card-trend"><i class="fas fa-check-circle"></i> This week</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #28A745, #20C997);">
              <i class="fas fa-prescription"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Emergency Cases</div>
              <div class="stat-card-value">0</div>
              <div class="stat-card-trend"><i class="fas fa-info-circle"></i> All clear</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #FFC107, #FF9800);">
              <i class="fas fa-ambulance"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="data-table-container">
        <div class="table-header">
          <h3>Today's Schedule</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Patient</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:00 AM</td>
                <td>Sarah Johnson</td>
                <td>Follow-up</td>
                <td><span class="badge badge-success">Confirmed</span></td>
              </tr>
              <tr>
                <td>11:00 AM</td>
                <td>Priya Sharma</td>
                <td>Consultation</td>
                <td><span class="badge badge-warning">Scheduled</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'provider-patients') {
    content.innerHTML = `
      <h2>Patient List</h2>
      <div class="data-table-container">
        <div class="table-header">
          <h3>All Patients</h3>
          <button class="btn btn-primary btn-sm"><i class="fas fa-user-plus"></i> Add Patient</button>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Blood Type</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${samplePatients.map(patient => `
                <tr>
                  <td>#${patient.id}</td>
                  <td>${patient.name}</td>
                  <td>${patient.age}</td>
                  <td>${patient.gender}</td>
                  <td>${patient.blood_type}</td>
                  <td>${patient.phone}</td>
                  <td><button class="btn btn-outline btn-sm"><i class="fas fa-eye"></i> View</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'provider-prescriptions') {
    content.innerHTML = `
      <h2>Prescription Management</h2>
      <button class="btn btn-primary" style="margin-bottom: 24px;"><i class="fas fa-plus"></i> Write New Prescription</button>
      
      <div class="data-table-container">
        <div class="table-header">
          <h3>Recent Prescriptions</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Patient</th>
                <th>Medication</th>
                <th>Dosage</th>
                <th>Duration</th>
                <th>Signature</th>
              </tr>
            </thead>
            <tbody>
              ${prescriptions.map(rx => `
                <tr>
                  <td>${rx.date}</td>
                  <td>${rx.patient}</td>
                  <td>${rx.medication}</td>
                  <td>${rx.dosage}</td>
                  <td>${rx.duration}</td>
                  <td><span class="badge badge-success"><i class="fas fa-check-circle"></i> ${rx.digital_signature}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'provider-audit') {
    content.innerHTML = `
      <h2>Audit Trail</h2>
      <div class="data-table-container">
        <div class="table-header">
          <h3>Your Access History</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Patient</th>
                <th>IP Address</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${auditLogEntries.filter(log => log.user === currentUser.name).map(log => `
                <tr>
                  <td>${log.timestamp}</td>
                  <td>${log.action}</td>
                  <td>${log.patient}</td>
                  <td>${log.ip_address}</td>
                  <td>${log.location}</td>
                  <td><span class="badge badge-${log.status === 'Success' ? 'success' : 'danger'}">${log.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

// TPA Dashboard
function loadTPADashboard() {
  loadTPAView('tpa-overview');
}

function loadTPAView(viewId) {
  const content = document.getElementById('tpaContent');
  
  if (viewId === 'tpa-overview') {
    content.innerHTML = `
      <div class="welcome-banner">
        <h1>TPA Authentication Dashboard</h1>
        <p>Monitoring and managing authentication across the platform</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Active Sessions</div>
              <div class="stat-card-value">247</div>
              <div class="stat-card-trend"><i class="fas fa-arrow-up"></i> +12 from last hour</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #0066CC, #00A896);">
              <i class="fas fa-users-cog"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Auth Requests</div>
              <div class="stat-card-value">1,234</div>
              <div class="stat-card-trend"><i class="fas fa-check-circle"></i> 98.9% success rate</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #28A745, #20C997);">
              <i class="fas fa-key"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Security Alerts</div>
              <div class="stat-card-value">3</div>
              <div class="stat-card-trend"><i class="fas fa-exclamation-triangle"></i> Requires attention</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #FFC107, #FF9800);">
              <i class="fas fa-shield-alt"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Blocked Attempts</div>
              <div class="stat-card-value">15</div>
              <div class="stat-card-trend"><i class="fas fa-ban"></i> Last 24 hours</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #DC3545, #C82333);">
              <i class="fas fa-user-slash"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="data-table-container">
        <div class="table-header">
          <h3>Recent Authentication Events</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Method</th>
                <th>IP Address</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025-10-28 18:45:12</td>
                <td>sarah.j@email.com</td>
                <td>Password + OTP</td>
                <td>192.168.1.100</td>
                <td>Kollam, Kerala</td>
                <td><span class="badge badge-success">Success</span></td>
              </tr>
              <tr>
                <td>2025-10-28 18:42:30</td>
                <td>dr.anil@hospital.com</td>
                <td>Biometric</td>
                <td>192.168.1.101</td>
                <td>Kollam, Kerala</td>
                <td><span class="badge badge-success">Success</span></td>
              </tr>
              <tr>
                <td>2025-10-28 18:40:15</td>
                <td>unknown@suspicious.com</td>
                <td>Password</td>
                <td>45.123.45.67</td>
                <td>Unknown</td>
                <td><span class="badge badge-danger">Blocked</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'tpa-sessions') {
    content.innerHTML = `
      <h2>Active Sessions Monitor</h2>
      <div class="data-table-container">
        <div class="table-header">
          <h3>Current Active Sessions (247)</h3>
          <button class="btn btn-outline btn-sm"><i class="fas fa-sync"></i> Refresh</button>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Login Time</th>
                <th>Device</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sarah Johnson</td>
                <td>Patient</td>
                <td>6:45 PM</td>
                <td>Chrome/Windows</td>
                <td>Kollam, Kerala</td>
                <td><button class="btn btn-outline btn-sm"><i class="fas fa-sign-out-alt"></i> Terminate</button></td>
              </tr>
              <tr>
                <td>Dr. Anil Menon</td>
                <td>Doctor</td>
                <td>8:30 AM</td>
                <td>Safari/MacOS</td>
                <td>Kollam, Kerala</td>
                <td><button class="btn btn-outline btn-sm"><i class="fas fa-sign-out-alt"></i> Terminate</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'tpa-security') {
    content.innerHTML = `
      <h2>Security Alerts & Anomaly Detection</h2>
      
      <div class="stats-grid" style="margin-bottom: 32px;">
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Failed Login Attempts</div>
              <div class="stat-card-value">8</div>
              <div class="stat-card-trend" style="color: var(--color-warning-amber);"><i class="fas fa-exclamation-circle"></i> Last hour</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #FFC107, #FF9800);">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-card-header">
            <div>
              <div class="stat-card-title">Suspicious IPs</div>
              <div class="stat-card-value">5</div>
              <div class="stat-card-trend" style="color: var(--color-red-500);"><i class="fas fa-ban"></i> Auto-blocked</div>
            </div>
            <div class="stat-card-icon" style="background: linear-gradient(135deg, #DC3545, #C82333);">
              <i class="fas fa-user-secret"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div class="data-table-container">
        <div class="table-header">
          <h3>Security Incidents</h3>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Type</th>
                <th>Details</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2025-10-28 18:05:33</td>
                <td>Brute Force</td>
                <td>Multiple failed login attempts from 45.123.45.67</td>
                <td><span class="badge badge-danger">High</span></td>
                <td><span class="badge badge-success">Blocked</span></td>
              </tr>
              <tr>
                <td>2025-10-28 16:22:10</td>
                <td>Unusual Location</td>
                <td>Login from unrecognized location</td>
                <td><span class="badge badge-warning">Medium</span></td>
                <td><span class="badge badge-info">Under Review</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  } else if (viewId === 'tpa-logs') {
    content.innerHTML = `
      <h2>Access Logs</h2>
      <div class="data-table-container">
        <div class="table-header">
          <h3>Complete Access History</h3>
          <button class="btn btn-outline btn-sm"><i class="fas fa-download"></i> Export</button>
        </div>
        <div class="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Action</th>
                <th>Patient</th>
                <th>IP Address</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${auditLogEntries.map(log => `
                <tr>
                  <td>${log.timestamp}</td>
                  <td>${log.user}</td>
                  <td>${log.action}</td>
                  <td>${log.patient}</td>
                  <td>${log.ip_address}</td>
                  <td>${log.location}</td>
                  <td><span class="badge badge-${log.status.includes('Success') ? 'success' : 'danger'}">${log.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}

// Encryption Demo
function performEncryption() {
  const plaintext = document.getElementById('plaintext').value;
  const algo = document.getElementById('encryptionAlgo').value;
  
  if (!plaintext.trim()) {
    showToast('Please enter some data to encrypt', 'warning');
    return;
  }
  
  // Show visualization
  const viz = document.getElementById('encryptionViz');
  viz.style.display = 'block';
  
  // Animate encryption steps
  const steps = ['step1', 'step2', 'step3', 'step4'];
  let currentStep = 0;
  
  const interval = setInterval(() => {
    if (currentStep > 0) {
      document.getElementById(steps[currentStep - 1]).classList.remove('active');
    }
    if (currentStep < steps.length) {
      document.getElementById(steps[currentStep]).classList.add('active');
      currentStep++;
    } else {
      clearInterval(interval);
      // Show encrypted output
      const startTime = Date.now();
      
      // Simulate encryption (using base64 encoding)
      let encrypted = btoa(plaintext);
      
      // Apply additional encoding based on algorithm
      if (algo === 'rsa') {
        encrypted = btoa(encrypted); // Double encoding for RSA simulation
      } else if (algo === 'hybrid') {
        encrypted = btoa(btoa(encrypted)); // Triple encoding for hybrid
      }
      
      const encTime = Date.now() - startTime;
      
      encryptedData = encrypted;
      encryptionKey = 'MedSecure_' + algo.toUpperCase() + '_Key_' + Date.now();
      
      document.getElementById('ciphertext').value = encrypted;
      document.getElementById('encTime').textContent = encTime + 'ms';
      document.getElementById('keySize').textContent = algo === 'aes' ? '256 bits' : algo === 'rsa' ? '2048 bits' : '256 + 2048 bits';
      
      document.getElementById('encryptedOutput').style.display = 'block';
      document.getElementById('decryptBtn').style.display = 'block';
      
      showToast('Data encrypted successfully!');
    }
  }, 800);
}

function performDecryption() {
  const ciphertext = document.getElementById('ciphertext').value;
  const algo = document.getElementById('encryptionAlgo').value;
  
  try {
    let decrypted = ciphertext;
    
    // Reverse the encoding based on algorithm
    if (algo === 'hybrid') {
      decrypted = atob(decrypted);
      decrypted = atob(decrypted);
    } else if (algo === 'rsa') {
      decrypted = atob(decrypted);
    }
    
    decrypted = atob(decrypted);
    
    document.getElementById('decryptedtext').value = decrypted;
    document.getElementById('decryptedOutput').style.display = 'block';
    
    showToast('Data decrypted successfully!');
  } catch (error) {
    showToast('Decryption failed! Invalid encrypted data.', 'error');
  }
}

// Audit Table
function populateAuditTable() {
  const tbody = document.getElementById('auditTableBody');
  if (tbody) {
    tbody.innerHTML = auditLogEntries.map(log => `
      <tr>
        <td>${log.timestamp}</td>
        <td>${log.user}</td>
        <td>${log.action}</td>
        <td>${log.patient}</td>
        <td>${log.location}</td>
        <td><span class="badge badge-${log.status.includes('Success') ? 'success' : 'danger'}">${log.status}</span></td>
      </tr>
    `).join('');
  }
}

// Contact Form
function handleContactSubmit(event) {
  event.preventDefault();
  showToast('Thank you! Your message has been sent successfully.');
  event.target.reset();
}

// Toast Notification
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  toastMessage.textContent = message;
  toast.classList.add('active');
  
  if (type === 'warning') {
    toast.style.background = 'var(--color-warning-amber)';
  } else if (type === 'error') {
    toast.style.background = 'var(--color-red-500)';
  } else {
    toast.style.background = 'var(--color-success-green)';
  }
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

// Utility Functions
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getStatusBadgeClass(status) {
  if (status.toLowerCase().includes('success') || status.toLowerCase().includes('confirmed') || status.toLowerCase().includes('ready')) {
    return 'badge-success';
  } else if (status.toLowerCase().includes('pending') || status.toLowerCase().includes('scheduled') || status.toLowerCase().includes('warning')) {
    return 'badge-warning';
  } else if (status.toLowerCase().includes('blocked') || status.toLowerCase().includes('failed') || status.toLowerCase().includes('danger')) {
    return 'badge-danger';
  } else {
    return 'badge-info';
  }
}