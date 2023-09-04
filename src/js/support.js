import fund1 from '../img/funds/fund-1.png';
import fund2 from '../img/funds/fund-2.png';
import fund3 from '../img/funds/fund-3.png';
import fund4 from '../img/funds/fund-4.png';
import fund5 from '../img/funds/fund-5.png';
import fund6 from '../img/funds/fund-6.png';
import fund7 from '../img/funds/fund-7.png';
import fund8 from '../img/funds/fund-8.png';
import fund9 from '../img/funds/fund-9.png';

import fund12 from '../img/funds/fund-1@2x.png';
import fund22 from '../img/funds/fund-2@2x.png';
import fund32 from '../img/funds/fund-3@2x.png';
import fund42 from '../img/funds/fund-4@2x.png';
import fund52 from '../img/funds/fund-5@2x.png';
import fund62 from '../img/funds/fund-6@2x.png';
import fund72 from '../img/funds/fund-7@2x.png';
import fund82 from '../img/funds/fund-8@2x.png';
import fund92 from '../img/funds/fund-9@2x.png';

const funds = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: fund1,
    srcset: fund12,
    width: 129,
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: fund2,
    srcset: fund22,
    width: 62,
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: fund3,
    srcset: fund32,
    width: 103,
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: fund4,
    srcset: fund42,
    width: 103,
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: fund5,
    srcset: fund52,
    width: 55,
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: fund6,
    srcset: fund62,
    width: 100,
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: fund7,
    srcset: fund72,
    width: 129,
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: fund8,
    srcset: fund82,
    width: 60,
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: fund9,
    srcset: fund92,
    width: 129,
  },
];

const btn = document.querySelector('.funds-slider');
const list = document.querySelector('.funds-list');

let startIndex = 0;
let PER_PAGE = 4;

function formatNumber(number) {
  return number.toString().padStart(2, '0');
}

function createMarkup(fund, index) {
  const listItem = document.createElement('li');
  const formattedNumber = formatNumber(index + 1);
  listItem.innerHTML = `
    <span class="fund-number">${formattedNumber}</span>
    <a class="link" href="${fund.url}" target="_blank">
      <img class="funds-image" srcset="${fund.img} 1x, ${fund.srcset} 2x" src="${fund.img}" alt="${fund.title}" width="${fund.width}" />
    </a>
  `;
  return listItem;
}

function displayFunds(startIndex) {
  list.innerHTML = '';
  for (let i = startIndex; i < startIndex + PER_PAGE; i++) {
    if (i >= funds.length) {
      break;
    }
    const fund = funds[i];
    const fundElement = createMarkup(fund, i);
    list.appendChild(fundElement);
  }

  if (startIndex + PER_PAGE >= funds.length) {
    setTimeout(() => {
      btn.classList.add('rotate');
    }, 50);
  } else {
    btn.classList.remove('rotate');
  }

  list.classList.remove('show');
  setTimeout(() => {
    list.classList.add('show');
  }, 10);
}

btn.addEventListener('click', () => {
  startIndex += PER_PAGE;
  if (startIndex >= funds.length) {
    startIndex = 0;
  }
  displayFunds(startIndex);
});

function updatePerPage() {
  if (window.innerWidth >= 768) {
    PER_PAGE = 6;
  } else {
    PER_PAGE = 4;
  }
  displayFunds(startIndex);
}
window.addEventListener('load', updatePerPage);
window.addEventListener('resize', updatePerPage);
updatePerPage();
