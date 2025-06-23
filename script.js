const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Load daily photo & menu
const photoRef = db.ref('daily/photo');
const menuRef = db.ref('daily/menu');

photoRef.on('value', snapshot => {
  const url = snapshot.val();
  document.getElementById('daily-photo').src = url;
});

menuRef.on('value', snapshot => {
  const menu = snapshot.val();
  document.getElementById('menu-text').textContent = menu;
});

// Load shops
const shopsRef = db.ref('shops');
const shopContainer = document.getElementById('shops-list');
if (shopContainer) {
  shopsRef.on('value', snapshot => {
    shopContainer.innerHTML = '';
    snapshot.forEach(child => {
      const shop = child.val();
      shopContainer.innerHTML += `
        <div>
          <img src="${shop.photo}" alt="Shop" class="image-card" />
          <h3>${shop.name}</h3>
          <p>${shop.location}</p>
        </div>`;
    });
  });
}

// Load ads
const adsRef = db.ref('ads');
const adContainer = document.getElementById('ads-list');
if (adContainer) {
  adsRef.on('value', snapshot => {
    adContainer.innerHTML = '';
    snapshot.forEach(child => {
      const ad = child.val();
      adContainer.innerHTML += `
        <div>
          <img src="${ad.photo}" alt="Ad" class="image-card" />
          <p>${ad.text}</p>
        </div>`;
    });
  });
}
