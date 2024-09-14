const pillForm = document.getElementById('pillForm');
const upcomingList = document.getElementById('upcomingList');
const takenList = document.getElementById('takenList');
const missedList = document.getElementById('missedList');
const invoiceList = document.getElementById('invoiceList');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function () {
  navLinks.classList.toggle('active');
});

let reminders = [];
let takenReminders = [];
let missedReminders = [];

pillForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const pillName = document.getElementById('pillName').value;
  const dosage = document.getElementById('dosage').value;
  const time = document.getElementById('time').value;
  const frequency = document.getElementById('frequency').value;

  const reminder = {
    id: new Date().getTime(),
    pillName,
    dosage,
    time,
    frequency,
    confirmed: false,
    missed: false,
  };

  reminders.push(reminder);
  addUpcomingReminder(reminder);
  setPillReminder(reminder);
  pillForm.reset();
});

function addUpcomingReminder(reminder) {
  const reminderItem = document.createElement('div');
  reminderItem.innerHTML = `
    <div>
      <strong>${reminder.pillName} (${reminder.dosage})</strong><br>
      Time: ${reminder.time}, every ${reminder.frequency} hours
    </div>
    <button onclick="confirmReminder(${reminder.id})">Confirm</button>
  `;
  upcomingList.appendChild(reminderItem);
}

function addTakenReminder(reminder) {
  const reminderItem = document.createElement('div');
  reminderItem.innerHTML = `
    <div>
      <strong>${reminder.pillName} (${reminder.dosage})</strong><br>
      Time: ${reminder.time}, every ${reminder.frequency} hours
    </div>
  `;
  takenList.appendChild(reminderItem);
}

function addMissedReminder(reminder) {
  const reminderItem = document.createElement('div');
  reminderItem.innerHTML = `
    <div>
      <strong>${reminder.pillName} (${reminder.dosage})</strong><br>
      Time: ${reminder.time}, every ${reminder.frequency} hours
    </div>
  `;
  missedList.appendChild(reminderItem);
}

function setPillReminder(reminder) {
  const reminderInterval = reminder.frequency * 60 * 60 * 1000;

  setInterval(() => {
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(parseInt(reminder.time.split(':')[0]), parseInt(reminder.time.split(':')[1]));

    if (now.getHours() === reminderTime.getHours() && now.getMinutes() === reminderTime.getMinutes() && !reminder.confirmed) {
      alert(`Time to take ${reminder.pillName} (${reminder.dosage})`);
    }
  }, reminderInterval);
}

function confirmReminder(id) {
  const reminder = reminders.find(r => r.id === id);
  if (reminder) {
    reminder.confirmed = true;
    addTakenReminder(reminder);
    upcomingList.querySelector(`div:nth-child(${reminders.indexOf(reminder) + 1})`).remove();
  }
}

function markMissedReminder(id) {
  const reminder = reminders.find(r => r.id === id);
  if (reminder) {
    reminder.missed = true;
    addMissedReminder(reminder);
    upcomingList.querySelector(`div:nth-child(${reminders.indexOf(reminder) + 1})`).remove();
  }
}

function addInvoice(invoice) {
  const invoiceItem = document.createElement('div');
  invoiceItem.innerHTML = `
    <div>
      <strong>${invoice.description}</strong><br>
      Amount: ${invoice.amount}
    </div>
  `;
  invoiceList.appendChild(invoiceItem);
}
