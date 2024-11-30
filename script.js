let participants = [];
let assignments = [];
let isAdminMode = false;

// მონაწილეების სახელების და პაროლების შეყვანის ფუნქცია
function setupParticipants() {
    const count = parseInt(document.getElementById('participants').value);
    const adminMode = document.getElementById('adminMode').value === 'yes';

    if (isNaN(count) || count < 2) {
        alert('მონაწილეების რაოდენობა უნდა იყოს 2 ან მეტი.');
        return;
    }

    isAdminMode = adminMode;
    participants = [];

    for (let i = 0; i < count; i++) {
        const name = prompt(`შეიყვანეთ მონაწილე ${i + 1}-ის სახელი:`);
        if (name) {
            const password = prompt(`შეიყვანეთ ${name}-ის პაროლი:`);
            participants.push({ name, password });
        }
    }

    if (participants.length !== count) {
        alert('შეიყვანეთ ყველა მონაწილის ინფორმაცია.');
        return;
    }

    assignSecretSanta();
    document.getElementById('setup').style.display = 'none';
    document.getElementById('assignments').style.display = 'block';

    // თუ წამყვანის რეჟიმი ჩართულია, ვაჩვენოთ შესაბამისი ღილაკი
    if (isAdminMode) {
        document.getElementById('adminButton').style.display = 'inline-block';
    }
}

// მონაწილეების აჯანყება და ადრესატების მინიჭება
function assignSecretSanta() {
    let recipients = [...participants];
    
    participants.forEach(participant => {
        let recipientIndex = Math.floor(Math.random() * recipients.length);
        
        while (recipients[recipientIndex].name === participant.name) {
            recipientIndex = Math.floor(Math.random() * recipients.length);
        }
        
        assignments.push({
            giver: participant,
            recipient: recipients[recipientIndex].name
        });
        recipients.splice(recipientIndex, 1);
    });
}

// წამყვანის რეჟიმის ჩვენება
function showAdminView() {
    if (!isAdminMode) return;

    const output = document.getElementById('output');
    output.innerHTML = '<h2>წამყვანის ხედვა:</h2>';
    assignments.forEach(pair => {
        output.innerHTML += `<p>${pair.giver.name} → ${pair.recipient}</p>`;
    });
}

// მონაწილის შესვლა და ადრესატის ნახვა
function participantLogin() {
    const name = prompt('შეიყვანეთ თქვენი სახელი:');
    const password = prompt('შეიყვანეთ თქვენი პაროლი:');
    
    const participant = participants.find(p => p.name === name && p.password === password);

    const output = document.getElementById('output');
    output.innerHTML = '';

    if (participant) {
        const pair = assignments.find(p => p.giver.name === name);
        output.innerHTML = `<h2>${name}-ის ადრესატი:</h2><p>${pair.recipient}</p>`;
    } else {
        alert('სახელი ან პაროლი არასწორია.');
        output.innerHTML = `<p>მონაწილის სახელი ვერ მოიძებნა ან პაროლი არასწორია.</p>`;
    }
}
