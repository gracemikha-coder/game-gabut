import * as THREE from 'three';

export interface SupermarketItem {
  id: string;
  name: string;
  price: number;
  color: string;
  shape: 'box' | 'cylinder' | 'sphere';
}

export const ITEM_CATALOG: SupermarketItem[] = [
  { id: 'susu', name: 'Susu Kotak', price: 12000, color: '#60a5fa', shape: 'box' },
  { id: 'roti', name: 'Roti Tawar', price: 15000, color: '#f59e0b', shape: 'box' },
  { id: 'sabun', name: 'Sabun Mandi', price: 8000, color: '#34d399', shape: 'box' },
  { id: 'jus', name: 'Jus Jeruk', price: 9000, color: '#fb923c', shape: 'cylinder' },
  { id: 'cokelat', name: 'Cokelat Bar', price: 14000, color: '#78350f', shape: 'box' },
  { id: 'apel', name: 'Apel Segar', price: 7000, color: '#ef4444', shape: 'sphere' },
  { id: 'keripik', name: 'Keripik Kentang', price: 11000, color: '#eab308', shape: 'cylinder' },
  { id: 'biskuit', name: 'Biskuit Manis', price: 10000, color: '#d97706', shape: 'box' },
];

export function buildSupermarketEnvironment(scene: THREE.Scene) {
  // 1. FLOOR (Light tiles)
  const floorGeo = new THREE.PlaneGeometry(24, 24);
  const floorMat = new THREE.MeshToonMaterial({ color: '#fdf6ee' });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Floor grid pattern lines
  const gridMat = new THREE.MeshBasicMaterial({ color: '#f3e8dc' });
  for (let i = -10; i <= 10; i += 2) {
    const lineX = new THREE.Mesh(new THREE.PlaneGeometry(0.04, 24), gridMat);
    lineX.rotation.x = -Math.PI / 2;
    lineX.position.set(i, 0.01, 0);
    const lineZ = new THREE.Mesh(new THREE.PlaneGeometry(24, 0.04), gridMat);
    lineZ.rotation.x = -Math.PI / 2;
    lineZ.position.set(0, 0.01, i);
    scene.add(lineX, lineZ);
  }

  // 2. WALL (Pastel warm pinkish-white)
  const wallGeo = new THREE.PlaneGeometry(24, 10);
  const wallMat = new THREE.MeshToonMaterial({ color: '#fce7f3' });
  const wall = new THREE.Mesh(wallGeo, wallMat);
  wall.position.set(0, 5, -8);
  scene.add(wall);

  // Wall trim
  const trim = new THREE.Mesh(new THREE.BoxGeometry(24, 0.4, 0.2), new THREE.MeshToonMaterial({ color: '#f472b6' }));
  trim.position.set(0, 4.5, -7.9);
  scene.add(trim);

  // 3. BACKGROUND GROCERY SHELVES (Rak supermarket warna-warni)
  const shelfColors = ['#fbcfe8', '#bfdbfe', '#fef08a'];
  [-5, 0, 5].forEach((sx, idx) => {
    const shelfGroup = new THREE.Group();
    const shelfBody = new THREE.Mesh(new THREE.BoxGeometry(3.2, 4.2, 1.2), new THREE.MeshToonMaterial({ color: shelfColors[idx] }));
    shelfBody.position.set(0, 2.1, 0);
    shelfGroup.add(shelfBody);

    // Shelf planks & colorful goods inside
    for (let h = 1; h <= 3; h++) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.1, 1.3), new THREE.MeshToonMaterial({ color: '#ffffff' }));
      plank.position.set(0, h, 0);
      shelfGroup.add(plank);

      // Goods on shelves
      for (let g = -1.2; g <= 1.2; g += 0.5) {
        const goodMat = new THREE.MeshToonMaterial({
          color: ['#f87171', '#34d399', '#60a5fa', '#fbbf24', '#c084fc'][(Math.abs(Math.floor(g * 10)) + h) % 5]
        });
        const good = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.35), goodMat);
        good.position.set(g, h + 0.22, 0.2);
        shelfGroup.add(good);
      }
    }

    shelfGroup.position.set(sx, 0, -6.5);
    scene.add(shelfGroup);
  });

  // 4. CASHIER COUNTER (Meja Kasir)
  const counterGroup = new THREE.Group();
  const counterBody = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.15, 1.6), new THREE.MeshToonMaterial({ color: '#ffe4e6' }));
  counterBody.position.set(0, 0.575, 0);
  counterBody.castShadow = true;
  counterBody.receiveShadow = true;

  // Countertop
  const top = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.1, 1.8), new THREE.MeshToonMaterial({ color: '#fb7185' }));
  top.position.set(0, 1.15, 0);

  // Conveyor belt / mat
  const belt = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.03, 1.2), new THREE.MeshToonMaterial({ color: '#475569' }));
  belt.position.set(-0.8, 1.21, 0);

  // Cash Register Machine
  const regBase = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 0.7), new THREE.MeshToonMaterial({ color: '#e2e8f0' }));
  regBase.position.set(1.3, 1.35, 0.1);

  // Screen with green POS display
  const regScreen = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.38, 0.08), new THREE.MeshToonMaterial({ color: '#15803d' }));
  regScreen.position.set(1.3, 1.7, 0.2);
  regScreen.rotation.x = -0.2;

  // Barcode scanner
  const scanner = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.25, 12), new THREE.MeshToonMaterial({ color: '#f43f5e' }));
  scanner.position.set(0.6, 1.3, -0.2);
  scanner.rotation.z = Math.PI / 4;

  counterGroup.add(counterBody, top, belt, regBase, regScreen, scanner);
  counterGroup.position.set(0, 0, 0);
  scene.add(counterGroup);

  return { regScreen, belt };
}
