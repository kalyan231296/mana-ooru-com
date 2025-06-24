const firebaseConfig = {
  apiKey: "AIzaSyA8v_xSk0wb-1ufVLiknOiEelq1vIGgIsQ",
  authDomain: "mana-45507.firebaseapp.com",
  databaseURL: "https://mana-45507-default-rtdb.firebaseio.com/",
  projectId: "mana-45507",
  storageBucket: "mana-45507.firebasestorage.app",
  messagingSenderId: "435398254769",
  appId: "1:435398254769:web:35ab9a6ffdc9abee8c4290"
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
