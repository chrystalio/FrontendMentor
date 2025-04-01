
let allExtensions = [];

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        allExtensions = data;

        const savedFilter = localStorage.getItem('selectedFilter') || 'all';
        filterExtensions(savedFilter);
        document.querySelectorAll('.filter-btn').forEach(btn => {
            const type = btn.getAttribute('data-filter');
            if (type === savedFilter) {
              btn.classList.remove('bg-white', 'text-[#091540]');
              btn.classList.add('bg-[#C7221A]', 'text-white');
            } else {
              btn.classList.remove('bg-[#C7221A]', 'text-white');
              btn.classList.add('bg-white', 'text-[#091540]');
            }
          });
    });

const renderData = (extensions) => {
    const container = document.getElementById('extensions');
    container.innerHTML = '';

    extensions.forEach(ext => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl p-5 shadow-sm';

        card.innerHTML = `
        <div class="flex">
            <div class="me-3 pt-1">
                <img src="${ext.logo}" alt="${ext.name}" class="max-w-20">
            </div>
            <div>
                <p class="text-lg font-bold">${ext.name}</p>
                <p class="text-sm py-1">${ext.description}</p>
            </div>
            </div>

            <div class="pt-6 lg:pt-10 flex justify-between items-center">
                <button tabindex="0" class="rounded-2xl focus:outline-2 focus:outline-offset-2 focus:outline-[#C7221A] focus:bg-slate-200 focus:border-slate-1-0 active:bg-[#C7221A] border border-slate-300 text-[#091540] py-1 px-4 text-sm hover:bg-[#C7221A] hover:text-white transition-colors duration-300 ease-in-out cursor-pointer">
                    Remove
                </button>

            <label class="relative inline-flex items-center cursor-pointer w-9 h-5">
                <input type="checkbox" class="sr-only peer" ${ext.isActive ? 'checked' : ''}>
                <div class="w-full h-full bg-gray-300 border border-[#C7221A] peer-checked:bg-[#C7221A] rounded-full transition-colors duration-300"></div>
                <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-[1rem] border border-white"></div>
            </label>
        </div>
      `;

      container.appendChild(card);
    })
}

const filterExtensions = (type) => {
    let filtered = [];

    if (type === 'active') {
        filtered = allExtensions.filter(ext => ext.isActive);
    } else if (type === 'inactive') {
        filtered = allExtensions.filter(ext => !ext.isActive);
    } else {
        filtered = allExtensions;
    }

    renderData(filtered);
}

document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {

        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-[#C7221A]', 'text-white');
            b.classList.add('bg-white', 'text-[#091540]');
        });

        btn.classList.remove('bg-white', 'text-[#091540]');
        btn.classList.add('bg-[#C7221A]', 'text-white');

        const type = btn.getAttribute('data-filter');
        localStorage.setItem('selectedFilter', type);
        filterExtensions(type);
    });
});
