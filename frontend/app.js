// --- Tab Navigation ---
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.tab-section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});
// Show first tab by default
if (tabs.length) {
    tabs[0].click();
}

// --- API Base URL ---
const API = '';

// --- Utility ---
function createTable(headers, rows) {
    const table = document.createElement('table');
    table.className = 'list-table';
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    headers.forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            if (cell instanceof Node) td.appendChild(cell);
            else td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
}

// --- Owners ---
async function loadOwners() {
    const res = await fetch(`${API}/api/owners`);
    const owners = await res.json();
    const list = document.getElementById('owners-list');
    list.innerHTML = '';
    const headers = ['ID', 'First Name', 'Last Name', 'Address', 'City', 'Telephone', 'Actions'];
    const rows = owners.map(o => [
        o.id, o.firstName, o.lastName, o.address, o.city, o.telephone,
        actionButtons(() => editOwner(o), () => deleteOwner(o.id))
    ]);
    list.appendChild(createTable(headers, rows));
}
function editOwner(owner) {
    const form = document.getElementById('owner-form');
    form.id.value = owner.id;
    form.firstName.value = owner.firstName;
    form.lastName.value = owner.lastName;
    form.address.value = owner.address;
    form.city.value = owner.city;
    form.telephone.value = owner.telephone;
}
async function deleteOwner(id) {
    if (!confirm('Delete owner?')) return;
    await fetch(`${API}/api/owners/${id}`, { method: 'DELETE' });
    loadOwners();
}
document.getElementById('owner-form').onsubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const owner = {
        firstName: f.firstName.value,
        lastName: f.lastName.value,
        address: f.address.value,
        city: f.city.value,
        telephone: f.telephone.value
    };
    let method = 'POST', url = `${API}/api/owners`;
    if (f.id.value) {
        method = 'PUT';
        url += '/' + f.id.value;
        owner.id = f.id.value;
    }
    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(owner)
    });
    f.reset();
    loadOwners();
};
document.getElementById('owner-form-cancel').onclick = () => {
    document.getElementById('owner-form').reset();
};

// --- Pets ---
async function loadPets() {
    const res = await fetch(`${API}/api/pets`);
    const pets = await res.json();
    const list = document.getElementById('pets-list');
    list.innerHTML = '';
    const headers = ['ID', 'Name', 'Birth Date', 'Owner ID', 'Type ID', 'Actions'];
    const rows = pets.map(p => [
        p.id, p.name, p.birthDate, p.ownerId, p.typeId,
        actionButtons(() => editPet(p), () => deletePet(p.id))
    ]);
    list.appendChild(createTable(headers, rows));
}
function editPet(pet) {
    const form = document.getElementById('pet-form');
    form.id.value = pet.id;
    form.name.value = pet.name;
    form.birthDate.value = pet.birthDate;
    form.ownerId.value = pet.ownerId;
    form.typeId.value = pet.typeId;
}
async function deletePet(id) {
    if (!confirm('Delete pet?')) return;
    await fetch(`${API}/api/pets/${id}`, { method: 'DELETE' });
    loadPets();
}
document.getElementById('pet-form').onsubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const pet = {
        name: f.name.value,
        birthDate: f.birthDate.value,
        ownerId: f.ownerId.value,
        typeId: f.typeId.value
    };
    let method = 'POST', url = `${API}/api/pets`;
    if (f.id.value) {
        method = 'PUT';
        url += '/' + f.id.value;
        pet.id = f.id.value;
    }
    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pet)
    });
    f.reset();
    loadPets();
};
document.getElementById('pet-form-cancel').onclick = () => {
    document.getElementById('pet-form').reset();
};

// --- Vets ---
async function loadVets() {
    const res = await fetch(`${API}/api/vets`);
    const vets = await res.json();
    const list = document.getElementById('vets-list');
    list.innerHTML = '';
    const headers = ['ID', 'First Name', 'Last Name', 'Specialties'];
    const rows = vets.map(v => [
        v.id, v.firstName, v.lastName, (v.specialties || []).map(s => s.name).join(', ')
    ]);
    list.appendChild(createTable(headers, rows));
}

// --- Visits ---
async function loadVisits() {
    const res = await fetch(`${API}/api/visits`);
    const visits = await res.json();
    const list = document.getElementById('visits-list');
    list.innerHTML = '';
    const headers = ['ID', 'Date', 'Description', 'Pet ID', 'Actions'];
    const rows = visits.map(v => [
        v.id, v.date, v.description, v.petId,
        actionButtons(() => editVisit(v), () => deleteVisit(v.id))
    ]);
    list.appendChild(createTable(headers, rows));
}
function editVisit(visit) {
    const form = document.getElementById('visit-form');
    form.id.value = visit.id;
    form.date.value = visit.date;
    form.description.value = visit.description;
    form.petId.value = visit.petId;
}
async function deleteVisit(id) {
    if (!confirm('Delete visit?')) return;
    await fetch(`${API}/api/visits/${id}`, { method: 'DELETE' });
    loadVisits();
}
document.getElementById('visit-form').onsubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const visit = {
        date: f.date.value,
        description: f.description.value,
        petId: f.petId.value
    };
    let method = 'POST', url = `${API}/api/visits`;
    if (f.id.value) {
        method = 'PUT';
        url += '/' + f.id.value;
        visit.id = f.id.value;
    }
    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visit)
    });
    f.reset();
    loadVisits();
};
document.getElementById('visit-form-cancel').onclick = () => {
    document.getElementById('visit-form').reset();
};

// --- Pet Types ---
async function loadPetTypes() {
    const res = await fetch(`${API}/api/pettypes`);
    const pettypes = await res.json();
    const list = document.getElementById('pettypes-list');
    list.innerHTML = '';
    const headers = ['ID', 'Name', 'Actions'];
    const rows = pettypes.map(pt => [
        pt.id, pt.name,
        actionButtons(() => editPetType(pt), () => deletePetType(pt.id))
    ]);
    list.appendChild(createTable(headers, rows));
}
function editPetType(pt) {
    const form = document.getElementById('pettype-form');
    form.id.value = pt.id;
    form.name.value = pt.name;
}
async function deletePetType(id) {
    if (!confirm('Delete pet type?')) return;
    await fetch(`${API}/api/pettypes/${id}`, { method: 'DELETE' });
    loadPetTypes();
}
document.getElementById('pettype-form').onsubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const pt = { name: f.name.value };
    let method = 'POST', url = `${API}/api/pettypes`;
    if (f.id.value) {
        method = 'PUT';
        url += '/' + f.id.value;
        pt.id = f.id.value;
    }
    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pt)
    });
    f.reset();
    loadPetTypes();
};
document.getElementById('pettype-form-cancel').onclick = () => {
    document.getElementById('pettype-form').reset();
};

// --- Specialties ---
async function loadSpecialties() {
    const res = await fetch(`${API}/api/specialties`);
    const specialties = await res.json();
    const list = document.getElementById('specialties-list');
    list.innerHTML = '';
    const headers = ['ID', 'Name', 'Actions'];
    const rows = specialties.map(s => [
        s.id, s.name,
        actionButtons(() => editSpecialty(s), () => deleteSpecialty(s.id))
    ]);
    list.appendChild(createTable(headers, rows));
}
function editSpecialty(s) {
    const form = document.getElementById('specialty-form');
    form.id.value = s.id;
    form.name.value = s.name;
}
async function deleteSpecialty(id) {
    if (!confirm('Delete specialty?')) return;
    await fetch(`${API}/api/specialties/${id}`, { method: 'DELETE' });
    loadSpecialties();
}
document.getElementById('specialty-form').onsubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const s = { name: f.name.value };
    let method = 'POST', url = `${API}/api/specialties`;
    if (f.id.value) {
        method = 'PUT';
        url += '/' + f.id.value;
        s.id = f.id.value;
    }
    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(s)
    });
    f.reset();
    loadSpecialties();
};
document.getElementById('specialty-form-cancel').onclick = () => {
    document.getElementById('specialty-form').reset();
};

// --- Users ---
async function loadUsers() {
    const res = await fetch(`${API}/api/users`);
    const users = await res.json();
    const list = document.getElementById('users-list');
    list.innerHTML = '';
    const headers = ['ID', 'Username', 'Role', 'Actions'];
    const rows = users.map(u => [
        u.id, u.username, u.role,
        actionButtons(() => editUser(u), () => deleteUser(u.id))
    ]);
    list.appendChild(createTable(headers, rows));
}
function editUser(u) {
    const form = document.getElementById('user-form');
    form.id.value = u.id;
    form.username.value = u.username;
    form.password.value = '';
    form.role.value = u.role;
}
async function deleteUser(id) {
    if (!confirm('Delete user?')) return;
    await fetch(`${API}/api/users/${id}`, { method: 'DELETE' });
    loadUsers();
}
document.getElementById('user-form').onsubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const u = {
        username: f.username.value,
        password: f.password.value,
        role: f.role.value
    };
    let method = 'POST', url = `${API}/api/users`;
    if (f.id.value) {
        method = 'PUT';
        url += '/' + f.id.value;
        u.id = f.id.value;
    }
    await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(u)
    });
    f.reset();
    loadUsers();
};
document.getElementById('user-form-cancel').onclick = () => {
    document.getElementById('user-form').reset();
};

// --- Action Buttons Helper ---
function actionButtons(editFn, deleteFn) {
    const edit = document.createElement('button');
    edit.textContent = 'Edit';
    edit.className = 'action-btn edit';
    edit.onclick = e => { e.preventDefault(); editFn(); };
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.className = 'action-btn';
    del.onclick = e => { e.preventDefault(); deleteFn(); };
    const span = document.createElement('span');
    span.appendChild(edit);
    span.appendChild(del);
    return span;
}

// --- Initial Loads ---
loadOwners();
loadPets();
loadVets();
loadVisits();
loadPetTypes();
loadSpecialties();
loadUsers(); 