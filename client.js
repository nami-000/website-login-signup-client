// Sample client data (in a real application, this would come from a backend)
const clientData = {
    id: 1,
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    address: "123 Main St, City",
    membershipStatus: "vip",
    membershipExpiry: "2024-12-31",
    points: 1250,
    totalVisits: 12,
    lastVisit: "2024-03-15",
    memberSince: "January 2023",
    loyaltyTier: "Gold",
    upcomingAppointments: [
        {
            id: 1,
            service: "Annual Check-up",
            date: "2024-03-25",
            provider: "Dr. Michael Brown",
            status: "scheduled"
        },
        {
            id: 2,
            service: "Grooming Service",
            date: "2024-04-05",
            provider: "Sarah Johnson",
            status: "scheduled"
        }
    ],
    recentAppointments: [
        {
            id: 3,
            service: "Grooming Service",
            date: "2024-03-15",
            provider: "Sarah Johnson",
            status: "completed"
        },
        {
            id: 4,
            service: "Vaccination",
            date: "2024-03-10",
            provider: "Dr. Michael Brown",
            status: "completed"
        }
    ],
    serviceHistory: [
        {
            id: 1,
            date: "2024-03-15",
            service: "Grooming Service",
            provider: "Sarah Johnson",
            status: "completed",
            amount: "$50.00",
            points: 50
        },
        {
            id: 2,
            date: "2024-03-10",
            service: "Vaccination",
            provider: "Dr. Michael Brown",
            status: "completed",
            amount: "$60.00",
            points: 60
        },
        {
            id: 3,
            date: "2024-02-20",
            service: "Full Grooming",
            provider: "Sarah Johnson",
            status: "completed",
            amount: "$80.00",
            points: 80
        }
    ],
    notificationSettings: {
        email: true,
        sms: true,
        appointmentReminders: true,
        promotionalOffers: true
    }
};

// Function to update dashboard stats
function updateDashboardStats() {
    document.querySelector('.h2').textContent = `Welcome, ${clientData.name}`;
    document.querySelector('[data-stat="appointments"]').textContent = clientData.upcomingAppointments.length;
    document.querySelector('[data-stat="visits"]').textContent = clientData.totalVisits;
    document.querySelector('[data-stat="membership"]').textContent = clientData.membershipStatus.toUpperCase();
    document.querySelector('[data-stat="points"]').textContent = clientData.points.toLocaleString();
}

// Function to update recent appointments
function updateRecentAppointments() {
    const recentList = document.querySelector('.recent-appointments');
    recentList.innerHTML = clientData.recentAppointments.map(appointment => `
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${appointment.service}</h6>
                <small class="text-muted">${new Date(appointment.date).toLocaleDateString()}</small>
            </div>
            <p class="mb-1">${appointment.status}</p>
            <small class="text-muted">Service Provider: ${appointment.provider}</small>
        </div>
    `).join('');
}

// Function to update upcoming services
function updateUpcomingServices() {
    const upcomingList = document.querySelector('.upcoming-services');
    upcomingList.innerHTML = clientData.upcomingAppointments.map(appointment => `
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${appointment.service}</h6>
                <small class="text-muted">${new Date(appointment.date).toLocaleDateString()}</small>
            </div>
            <p class="mb-1">${appointment.status}</p>
            <small class="text-muted">Service Provider: ${appointment.provider}</small>
        </div>
    `).join('');
}

// Function to update profile information
function updateProfileInfo() {
    document.getElementById('profile-name').textContent = clientData.name;
    document.getElementById('profile-email').textContent = clientData.email;
    document.getElementById('profile-phone').textContent = clientData.phone;
    document.getElementById('profile-address').textContent = clientData.address;
    document.getElementById('profile-membership').textContent = clientData.membershipStatus.toUpperCase();
    document.getElementById('profile-member-since').textContent = clientData.memberSince;
    document.getElementById('membership-type').textContent = clientData.membershipStatus.toUpperCase();
    document.getElementById('membership-expiry').textContent = clientData.membershipExpiry;
    document.getElementById('membership-points').textContent = clientData.points.toLocaleString();
    document.getElementById('loyalty-tier').textContent = clientData.loyaltyTier;
}

// Function to update appointments list
function updateAppointmentsList() {
    const appointmentsList = document.querySelector('.upcoming-appointments-list');
    appointmentsList.innerHTML = clientData.upcomingAppointments.map(appointment => `
        <div class="list-group-item">
            <div class="d-flex w-100 justify-content-between">
                <h6 class="mb-1">${appointment.service}</h6>
                <small class="text-muted">${new Date(appointment.date).toLocaleDateString()}</small>
            </div>
            <p class="mb-1">${appointment.status}</p>
            <small class="text-muted">Service Provider: ${appointment.provider}</small>
        </div>
    `).join('');
}

// Function to update service history
function updateServiceHistory(filter = 'all') {
    const historyTableBody = document.getElementById('history-table-body');
    let filteredHistory = clientData.serviceHistory;

    if (filter === 'grooming') {
        filteredHistory = clientData.serviceHistory.filter(service => 
            service.service.toLowerCase().includes('grooming')
        );
    } else if (filter === 'vet') {
        filteredHistory = clientData.serviceHistory.filter(service => 
            service.service.toLowerCase().includes('vaccination') || 
            service.provider.toLowerCase().includes('dr.')
        );
    }

    // Get service prices
    const servicePrices = {
        "Full & Basic Grooming": 1500.00,
        "Bath & Blowdry": 800.00,
        "Haircut": 1200.00,
        "Nail Trim": 300.00,
        "Ear Cleaning": 400.00,
        "Teeth Brushing": 500.00
    };

    historyTableBody.innerHTML = filteredHistory.map(service => `
        <tr>
            <td>${new Date(service.date).toLocaleDateString()}</td>
            <td>${service.service}</td>
            <td>${service.provider}</td>
            <td>${service.status}</td>
            <td>₱${servicePrices[service.service]?.toFixed(2) || '0.00'}</td>
            <td>${service.points}</td>
        </tr>
    `).join('');
}

// Function to update notification settings
function updateNotificationSettings() {
    document.getElementById('emailNotifications').checked = clientData.notificationSettings.email;
    document.getElementById('smsNotifications').checked = clientData.notificationSettings.sms;
    document.getElementById('appointmentReminders').checked = clientData.notificationSettings.appointmentReminders;
    document.getElementById('promotionalOffers').checked = clientData.notificationSettings.promotionalOffers;
}

// Handle form submissions and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    updateDashboardStats();
    updateRecentAppointments();
    updateUpcomingServices();
    updateProfileInfo();
    updateAppointmentsList();
    updateServiceHistory();
    updateNotificationSettings();

    // Handle navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.dataset.section;
            
            // Hide all sections
            document.querySelectorAll('.section-content').forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected section
            document.getElementById(`${section}-section`).style.display = 'block';
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Handle profile form submission
    const profileForm = document.getElementById('profileForm');
    const saveProfileButton = document.getElementById('saveProfile');

    saveProfileButton.addEventListener('click', function() {
        if (profileForm.checkValidity()) {
            const formData = new FormData(profileForm);
            
            // Update client data
            clientData.name = formData.get('fullName');
            clientData.email = formData.get('email');
            clientData.phone = formData.get('phone');
            clientData.address = formData.get('address');
            clientData.membershipStatus = formData.get('membershipStatus');

            // Update dashboard and profile
            updateDashboardStats();
            updateProfileInfo();

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('editProfileModal'));
            modal.hide();
            
            // Show success message
            alert('Profile updated successfully!');
        } else {
            profileForm.reportValidity();
        }
    });

    // Handle appointment scheduling
    const appointmentForm = document.getElementById('appointmentForm');
    const scheduleAppointmentButton = document.getElementById('scheduleAppointment');

    scheduleAppointmentButton.addEventListener('click', function() {
        if (appointmentForm.checkValidity()) {
            const formData = new FormData(appointmentForm);
            const serviceType = formData.get('serviceType');
            const selectedOption = appointmentForm.querySelector(`select[name="serviceType"] option[value="${serviceType}"]`);
            const price = selectedOption ? selectedOption.getAttribute('data-price') : '0';

            const newAppointment = {
                id: clientData.upcomingAppointments.length + 1,
                service: serviceType,
                date: formData.get('appointmentDate'),
                provider: "To be assigned",
                status: "scheduled",
                price: parseFloat(price)
            };

            clientData.upcomingAppointments.push(newAppointment);
            updateDashboardStats();
            updateAppointmentsList();
            updateUpcomingServices();

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('scheduleAppointmentModal'));
            modal.hide();
            
            // Show success message
            alert('Appointment scheduled successfully!');
        } else {
            appointmentForm.reportValidity();
        }
    });

    // Add event listener to service type select to show price
    const serviceTypeSelect = document.querySelector('select[name="serviceType"]');
    if (serviceTypeSelect) {
        serviceTypeSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.getAttribute('data-price');
            if (price) {
                // You can add a price display element if you want to show it separately
                console.log(`Selected service price: ₱${price}`);
            }
        });
    }

    // Handle history filters
    document.getElementById('filter-all').addEventListener('click', function() {
        updateServiceHistory('all');
    });

    document.getElementById('filter-grooming').addEventListener('click', function() {
        updateServiceHistory('grooming');
    });

    document.getElementById('filter-vet').addEventListener('click', function() {
        updateServiceHistory('vet');
    });

    // Handle notification settings
    const notificationSettingsForm = document.getElementById('notificationSettings');
    notificationSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clientData.notificationSettings = {
            email: document.getElementById('emailNotifications').checked,
            sms: document.getElementById('smsNotifications').checked,
            appointmentReminders: document.getElementById('appointmentReminders').checked,
            promotionalOffers: document.getElementById('promotionalOffers').checked
        };
        alert('Notification preferences updated successfully!');
    });

    // Handle security settings
    const securitySettingsForm = document.getElementById('securitySettings');
    securitySettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, you would handle password change here
        alert('Password updated successfully!');
    });
});