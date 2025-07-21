// --- Login Logic ---
function showAppAfterLogin() {
    document.getElementById('login-overlay').classList.remove('is-active');
    showTab('dashboard');
}
document.getElementById('login-btn').onclick = function() {
    const user = document.getElementById('login-username').value;
    const pass = document.getElementById('login-password').value;
    const error = document.getElementById('login-error');
    if (user === 'user' && pass === 'password') {
        error.style.display = 'none';
        showAppAfterLogin();
    } else {
        error.textContent = 'Usuario o contraseña incorrectos';
        error.style.display = 'block';
    }
};
// Enter key submits login
['login-username','login-password'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', function(e) {
        if (e.key === 'Enter') document.getElementById('login-btn').click();
    });
});

// --- Tab Navigation ---
function showTab(tab) {
    document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(tab);
    if (section) section.classList.add('active');
    // Set tab active in nav
    document.querySelectorAll('.tabs li').forEach(li => li.classList.remove('is-active'));
    const nav = Array.from(document.querySelectorAll('.tab-btn')).find(a => a.dataset.tab === tab);
    if (nav && nav.parentElement) nav.parentElement.classList.add('is-active');
}
// Nav click
Array.from(document.querySelectorAll('.tab-btn')).forEach(btn => {
    btn.onclick = function(e) {
        e.preventDefault();
        showTab(btn.dataset.tab);
    };
});
// Dashboard card click
Array.from(document.querySelectorAll('.dashboard-card')).forEach(card => {
    card.onclick = function(e) {
        e.preventDefault();
        if (card.dataset.tab === 'aboutus') {
            // Hide all tab-sections except dashboard, hide dashboard cards, show About Us
            document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
            document.getElementById('dashboard').classList.add('active');
            document.getElementById('dashboard-cards').style.display = 'none';
            document.getElementById('aboutus').style.display = '';
            window.scrollTo(0, 0);
        } else {
            showTab(card.dataset.tab);
        }
    };
});
// About Us back button
const aboutusBack = document.getElementById('aboutus-back');
if (aboutusBack) {
    aboutusBack.onclick = function() {
        document.getElementById('aboutus').style.display = 'none';
        document.getElementById('dashboard-cards').style.display = '';
        document.getElementById('dashboard').classList.add('active');
        window.scrollTo(0, 0);
    };
}
// Show only dashboard by default
showTab('dashboard');

// --- Specialties file input: show selected filename ---
const specialtyFileInput = document.getElementById('specialty-upload-file');
const specialtyFileName = document.getElementById('specialty-upload-filename');
specialtyFileInput.addEventListener('change', function() {
    specialtyFileName.textContent = specialtyFileInput.files.length ? specialtyFileInput.files[0].name : 'Ningún archivo seleccionado';
});

// --- API Base URL ---
const API = '/petclinic';

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
    try {
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(owner)
        });
        if (!res.ok) {
            const err = await res.json();
            alert(err.detail || 'Unknown error');
            return;
        }
        f.reset();
        loadOwners();
    } catch (err) {
        alert('Network error');
    }
};
document.getElementById('owner-form-cancel').onclick = () => {
    document.getElementById('owner-form').reset();
};

// --- Pet Types for Pet Form Dropdown ---
let petTypesCache = [];
async function populatePetTypeDropdown() {
    const res = await fetch(`${API}/api/pettypes`);
    const pettypes = await res.json();
    petTypesCache = pettypes;
    const select = document.getElementById('pet-type-select');
    select.innerHTML = '<option value="">Select Pet Type</option>';
    pettypes.forEach(pt => {
        const option = document.createElement('option');
        option.value = pt.id;
        option.textContent = pt.name;
        select.appendChild(option);
    });
}
// Call this when loading pets and when showing the pet form
// --- Pets ---
async function loadPets() {
    await populatePetTypeDropdown();
    const res = await fetch(`${API}/api/pets`);
    const pets = await res.json();
    const list = document.getElementById('pets-list');
    list.innerHTML = '';
    const headers = ['ID', 'Name', 'Birth Date', 'Owner ID', 'Type', 'Actions'];
    const rows = pets.map(p => [
        p.id, p.name, p.birthDate, p.ownerId, (p.type ? p.type.name : ''),
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
    // Set the dropdown to the correct type
    if (pet.type && pet.type.id) {
        form.typeId.value = pet.type.id;
    } else {
        form.typeId.value = '';
    }
}
async function deletePet(id) {
    if (!confirm('Delete pet?')) return;
    await fetch(`${API}/api/pets/${id}`, { method: 'DELETE' });
    loadPets();
}
document.getElementById('pet-form').onsubmit = async e => {
    e.preventDefault();
    const f = e.target;
    const typeId = f.typeId.value;
    const typeObj = petTypesCache.find(pt => pt.id == typeId);
    const pet = {
        name: f.name.value,
        birthDate: f.birthDate.value,
        ownerId: f.ownerId.value,
        type: typeObj ? { id: typeObj.id, name: typeObj.name } : null
    };
    let method = 'POST', url = `${API}/api/pets`;
    if (f.id.value) {
        method = 'PUT';
        url += '/' + f.id.value;
        pet.id = f.id.value;
    }
    try {
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pet)
        });
        if (!res.ok) {
            const err = await res.json();
            alert(err.detail || 'Unknown error');
            return;
        }
        f.reset();
        loadPets();
    } catch (err) {
        alert('Network error');
    }
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
// --- Modal for Error Display ---
function showModal(message) {
    let modal = document.getElementById('error-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'error-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.3)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.innerHTML = '<div style="background:#fff;padding:2rem 2.5rem;border-radius:8px;max-width:400px;text-align:center;box-shadow:0 2px 8px #0002;" class="u-full-width"><div id="error-modal-message" class="u-full-width"></div><br><button id="error-modal-close" class="button-primary">Close</button></div>';
        document.body.appendChild(modal);
        modal.querySelector('#error-modal-close').onclick = () => {
            modal.style.display = 'none';
        };
    }
    modal.querySelector('#error-modal-message').textContent = message;
    modal.style.display = 'flex';
}
// --- Visits ---
function getIframeDescriptionValue() {
    const iframe = document.getElementById('visit-description-iframe');
    try {
        return iframe.contentDocument.body.innerText || '';
    } catch {
        return '';
    }
}
function setIframeDescriptionValue(val) {
    const iframe = document.getElementById('visit-description-iframe');
    try {
        iframe.contentDocument.body.innerText = val || '';
    } catch {
        // ignore
    }
}
// Ensure iframe is editable
function makeIframeEditable() {
    const iframe = document.getElementById('visit-description-iframe');
    iframe.onload = () => {
        iframe.contentDocument.body.contentEditable = true;
    };
    // If already loaded
    if (iframe.contentDocument && iframe.contentDocument.body) {
        iframe.contentDocument.body.contentEditable = true;
    }
}
makeIframeEditable();
document.getElementById('visit-description-iframe').addEventListener('load', makeIframeEditable);

function editVisit(visit) {
    const form = document.getElementById('visit-form');
    form.id.value = visit.id;
    form.date.value = visit.date;
    setIframeDescriptionValue(visit.description);
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
    const description = getIframeDescriptionValue();
    if (!description.trim()) {
        showModal('Description is required.');
        return;
    }
    const visit = {
        date: f.date.value,
        description,
        petId: f.petId.value
    };
    let method = 'POST', url = `${API}/api/visits`;
    if (f.id.value) {
        method = 'PUT';
        url += '/' + f.id.value;
        visit.id = f.id.value;
    }
    try {
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(visit)
        });
        if (!res.ok) {
            const err = await res.json();
            // Show validation errors as modal, others as alert
            if (err.title && err.title.includes('Validation')) {
                showModal(err.detail || 'Validation error');
            } else {
                alert(err.detail || 'Unknown error');
            }
            return;
        }
        f.reset();
        setIframeDescriptionValue('');
        loadVisits();
    } catch (err) {
        alert('Network error');
    }
};
document.getElementById('visit-form-cancel').onclick = () => {
    document.getElementById('visit-form').reset();
    setIframeDescriptionValue('');
};

// --- Loading Overlay ---
function showLoading() {
    let overlay = document.getElementById('loading-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(255,255,255,0.7)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';
        overlay.innerHTML = '<div style="font-size:2rem;color:#1976d2;" class="u-full-width">Loading...</div>';
        document.body.appendChild(overlay);
    }
    overlay.style.display = 'flex';
}
function hideLoading() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';
}
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
    // Random delay 5-10 seconds
    const delay = 5000 + Math.floor(Math.random() * 5001);
    showLoading();
    setTimeout(async () => {
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pt)
            });
            if (!res.ok) {
                const err = await res.json();
                alert(err.detail || 'Unknown error');
                hideLoading();
                return;
            }
            f.reset();
            loadPetTypes();
        } catch (err) {
            alert('Network error');
        }
        hideLoading();
    }, delay);
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
    try {
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(s)
        });
        if (!res.ok) {
            const err = await res.json();
            alert(err.detail || 'Unknown error');
            return;
        }
        f.reset();
        loadSpecialties();
    } catch (err) {
        alert('Network error');
    }
};
document.getElementById('specialty-form-cancel').onclick = () => {
    document.getElementById('specialty-form').reset();
};

// --- Specialties CSV Upload (Frontend Only) ---
document.getElementById('specialty-upload-btn').onclick = async () => {
    const fileInput = document.getElementById('specialty-upload-file');
    const file = fileInput.files[0];
    if (!file) {
        showModal('Please select a CSV or TXT file.');
        return;
    }
    const reader = new FileReader();
    reader.onload = async function(e) {
        const text = e.target.result;
        // Split by comma, trim, and filter out empty
        const specialties = text.split(',').map(s => s.trim()).filter(Boolean);
        if (specialties.length === 0) {
            showModal('No specialties found in file.');
            return;
        }
        showLoading();
        let successCount = 0, failCount = 0;
        for (const name of specialties) {
            try {
                const res = await fetch(`${API}/api/specialties`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name })
                });
                if (res.ok) {
                    successCount++;
                } else {
                    failCount++;
                }
            } catch {
                failCount++;
            }
        }
        loadSpecialties();
        // Random delay 5-10 seconds before showing modal
        const delay = 5000 + Math.floor(Math.random() * 5001);
        setTimeout(() => {
            hideLoading();
            showModal(`Uploaded ${successCount} specialties to backend.${failCount ? ' ' + failCount + ' failed.' : ''}`);
        }, delay);
    };
    reader.readAsText(file);
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