const postConfessionBtn = document.getElementById('post-confession-btn');
const confessionPopup = document.getElementById('confession-popup');
const senderNameInput = document.getElementById('sender-name');
const messageInput = document.getElementById('message');
const postBtn = document.getElementById('post-btn');
const datePickerInput = document.getElementById('date-picker');
const confessionsTbody = document.getElementById('confessions-tbody');

const bannedWords = ['Pornhub', 'Glen', 'Hilario', 'Albert', 'Bitch', 'Pakyu'];

postConfessionBtn.addEventListener('click', () => {
 confessionPopup.classList.remove('hidden');
 confessionPopup.classList.add('fade-in');
});

postBtn.addEventListener('click', () => {
 const senderName = senderNameInput.value.trim();
 const message = messageInput.value.trim();

 if (senderName && message) {
  if (message.length > 300) {
   alert('Message exceeds 300 words!');
  } else if (bannedWords.some(word => message.includes(word))) {
   alert('You added banned words!');
  } else {
   const confessionData = {
    senderName,
    message,
    timestamp: new Date().toISOString(),
   };

   const existingConfessions = localStorage.getItem('confessions');
   const confessions = existingConfessions ? JSON.parse(existingConfessions) : [];

   confessions.push(confessionData);
   localStorage.setItem('confessions', JSON.stringify(confessions));

   updateConfessionsTable();
   confessionPopup.classList.remove('fade-in');
   confessionPopup.classList.add('hidden');
  }
 } else {
  alert('Please fill in all fields!');
 }
});

datePickerInput.addEventListener('input', () => {
 const selectedDate = datePickerInput.value;
 updateConfessionsTable(selectedDate);
});

function updateConfessionsTable(selectedDate) {
 const existingConfessions = localStorage.getItem('confessions');
 const confessions = existingConfessions ? JSON.parse(existingConfessions) : [];

 if (selectedDate) {
  confessions = confessions.filter(confession => {
   const confessionDate = new Date(confession.timestamp).toISOString().split('T')[0];
   return confessionDate === selectedDate;
  });
 }

 const tableHtml = confessions.map((confession, index) => {
  return `
            <tr>
                <td>${new Date(confession.timestamp).toLocaleString()}</td>
                <td>${confession.message}</td>
                <td>${confession.senderName}</td>
            </tr>
        `;
 }).join('');

 confessionsTbody.innerHTML = tableHtml;
}

updateConfessionsTable();