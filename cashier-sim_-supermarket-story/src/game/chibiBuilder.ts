import * as THREE from 'three';

export interface CharacterConfig {
  gender: 'female' | 'male';
  skinColor: string;
  hairStyle: number; // 0, 1, 2
  hairColor: string;
  outfitColor: string;
  accessory: number; // 0, 1, 2
  name: string;
}

export const FEMALE_HAIR_COLORS = ['#221f1f', '#6a381f', '#f7b6cf'];
export const MALE_HAIR_COLORS = ['#1a1a1a', '#54321d', '#e5b869'];
export const SKIN_TONES = ['#fed7aa', '#fcd34d', '#b45309'];

export const FEMALE_OUTFITS = [
  { label: 'Pink Pastel', primary: '#f472b6', secondary: '#ffffff' },
  { label: 'Biru Lembut', primary: '#38bdf8', secondary: '#ffffff' },
  { label: 'Kuning Ceria', primary: '#facc15', secondary: '#ffffff' },
];

export const MALE_OUTFITS = [
  { label: 'Biru Navy', primary: '#0284c7', secondary: '#f8fafc', pants: '#334155' },
  { label: 'Hijau Segar', primary: '#16a34a', secondary: '#f8fafc', pants: '#1e293b' },
  { label: 'Abu Elegan', primary: '#64748b', secondary: '#f8fafc', pants: '#1f2937' },
];

export function createChibiCharacter(cfg: CharacterConfig): THREE.Group {
  const group = new THREE.Group();

  // Materials
  const skinMat = new THREE.MeshToonMaterial({ color: cfg.skinColor });
  const hairMat = new THREE.MeshToonMaterial({ color: cfg.hairColor });
  const eyeMat = new THREE.MeshToonMaterial({ color: '#1e293b' });
  const blushMat = new THREE.MeshToonMaterial({ color: '#fb7185', transparent: true, opacity: 0.6 });
  const whiteMat = new THREE.MeshToonMaterial({ color: '#ffffff' });

  let primaryMat = new THREE.MeshToonMaterial({ color: cfg.outfitColor });
  let pantsMat = new THREE.MeshToonMaterial({ color: '#334155' });

  if (cfg.gender === 'male') {
    const found = MALE_OUTFITS.find(o => o.primary === cfg.outfitColor) || MALE_OUTFITS[0];
    primaryMat = new THREE.MeshToonMaterial({ color: found.primary });
    pantsMat = new THREE.MeshToonMaterial({ color: found.pants });
  }

  // 1. HEAD (Big cute chibi head)
  const headGeo = new THREE.SphereGeometry(0.7, 24, 24);
  headGeo.scale(1, 0.95, 0.95);
  const head = new THREE.Mesh(headGeo, skinMat);
  head.position.y = 1.6;
  head.castShadow = true;
  group.add(head);

  // Big Eyes
  const eyeGeo = new THREE.SphereGeometry(0.09, 16, 16);
  eyeGeo.scale(0.8, 1.2, 0.3);
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.25, 1.62, 0.62);
  const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
  eyeR.position.set(0.25, 1.62, 0.62);
  group.add(eyeL, eyeR);

  // Eye shines
  const shineGeo = new THREE.SphereGeometry(0.03, 8, 8);
  const shineL = new THREE.Mesh(shineGeo, whiteMat);
  shineL.position.set(-0.23, 1.66, 0.65);
  const shineR = new THREE.Mesh(shineGeo, whiteMat);
  shineR.position.set(0.27, 1.66, 0.65);
  group.add(shineL, shineR);

  // Cute Blush on Cheeks
  const blushGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.02, 16);
  blushGeo.rotateX(Math.PI / 2);
  const blushL = new THREE.Mesh(blushGeo, blushMat);
  blushL.position.set(-0.4, 1.48, 0.55);
  const blushR = new THREE.Mesh(blushGeo, blushMat);
  blushR.position.set(0.4, 1.48, 0.55);
  group.add(blushL, blushR);

  // Cute Smile
  const smileGeo = new THREE.TorusGeometry(0.07, 0.018, 8, 16, Math.PI);
  const smileMat = new THREE.MeshToonMaterial({ color: '#881337' });
  const smile = new THREE.Mesh(smileGeo, smileMat);
  smile.rotation.x = Math.PI;
  smile.position.set(0, 1.45, 0.63);
  group.add(smile);

  // 2. HAIR STYLES
  const hairGroup = new THREE.Group();
  if (cfg.gender === 'female') {
    // Top hair dome
    const domeGeo = new THREE.SphereGeometry(0.74, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.8);
    const dome = new THREE.Mesh(domeGeo, hairMat);
    dome.position.set(0, 1.66, 0);
    hairGroup.add(dome);

    // Bangs
    const bangGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.4, 12);
    bangGeo.rotateZ(Math.PI / 4);
    const bangL = new THREE.Mesh(bangGeo, hairMat);
    bangL.position.set(-0.35, 1.9, 0.45);
    const bangR = new THREE.Mesh(bangGeo, hairMat);
    bangR.position.set(0.35, 1.9, 0.45);
    bangR.rotation.y = Math.PI;
    hairGroup.add(bangL, bangR);

    if (cfg.hairStyle === 0) {
      // Long Straight Hair
      const sideL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 1.1, 12), hairMat);
      sideL.position.set(-0.55, 1.25, 0.05);
      const sideR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 1.1, 12), hairMat);
      sideR.position.set(0.55, 1.25, 0.05);
      const back = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.1, 0.25), hairMat);
      back.position.set(0, 1.25, -0.45);
      hairGroup.add(sideL, sideR, back);
    } else if (cfg.hairStyle === 1) {
      // Ponytail
      const ponyGeo = new THREE.ConeGeometry(0.24, 0.7, 16);
      ponyGeo.rotateX(-Math.PI / 3);
      const ponytail = new THREE.Mesh(ponyGeo, hairMat);
      ponytail.position.set(0, 1.85, -0.75);
      hairGroup.add(ponytail);
    } else {
      // Short Bob
      const bobGeo = new THREE.SphereGeometry(0.76, 16, 16);
      bobGeo.scale(1.05, 0.85, 1.05);
      const bob = new THREE.Mesh(bobGeo, hairMat);
      bob.position.set(0, 1.55, -0.08);
      hairGroup.add(bob);
    }
  } else {
    // Male Hair
    const domeGeo = new THREE.SphereGeometry(0.73, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeo, hairMat);
    dome.position.set(0, 1.68, 0);
    hairGroup.add(dome);

    if (cfg.hairStyle === 0) {
      // Short Neat
      const sideGeo = new THREE.CylinderGeometry(0.68, 0.7, 0.35, 16);
      const side = new THREE.Mesh(sideGeo, hairMat);
      side.position.set(0, 1.62, 0);
      hairGroup.add(side);
    } else if (cfg.hairStyle === 1) {
      // Spiky Hair
      for (let i = -2; i <= 2; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 8), hairMat);
        spike.position.set(i * 0.18, 2.3, -0.05 + Math.abs(i) * 0.04);
        spike.rotation.z = -i * 0.2;
        hairGroup.add(spike);
      }
    } else {
      // Slick Hair
      const slick = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.25, 0.8), hairMat);
      slick.position.set(0, 2.2, -0.1);
      slick.rotation.x = -0.15;
      hairGroup.add(slick);
    }
  }
  group.add(hairGroup);

  // 3. BODY & OUTFIT
  const bodyGroup = new THREE.Group();
  if (cfg.gender === 'female') {
    // Dress / Skirt
    const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.36, 0.55, 16), primaryMat);
    chest.position.y = 0.95;
    const apron = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.38, 0.05), whiteMat);
    apron.position.set(0, 0.95, 0.28);

    const skirt = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.45, 18, 1, true), primaryMat);
    skirt.position.y = 0.55;

    // Legs
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.45, 12), skinMat);
    legL.position.set(-0.16, 0.22, 0);
    const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.45, 12), skinMat);
    legR.position.set(0.16, 0.22, 0);

    // Shoes
    const shoeMat = new THREE.MeshToonMaterial({ color: '#be185d' });
    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.22), shoeMat);
    shoeL.position.set(-0.16, 0.05, 0.04);
    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.22), shoeMat);
    shoeR.position.set(0.16, 0.05, 0.04);

    bodyGroup.add(chest, apron, skirt, legL, legR, shoeL, shoeR);
  } else {
    // Male Shirt & Pants
    const shirt = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.35, 0.6, 16), primaryMat);
    shirt.position.y = 0.95;
    const badge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.04), whiteMat);
    badge.position.set(0.14, 1.05, 0.28);

    // Pants
    const legL = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.6, 12), pantsMat);
    legL.position.set(-0.16, 0.35, 0);
    const legR = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.6, 12), pantsMat);
    legR.position.set(0.16, 0.35, 0);

    // Shoes
    const shoeMat = new THREE.MeshToonMaterial({ color: '#111827' });
    const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.24), shoeMat);
    shoeL.position.set(-0.16, 0.05, 0.04);
    const shoeR = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.24), shoeMat);
    shoeR.position.set(0.16, 0.05, 0.04);

    bodyGroup.add(shirt, badge, legL, legR, shoeL, shoeR);
  }

  // Arms
  const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 10), primaryMat);
  armL.position.set(-0.4, 0.95, 0.05);
  armL.rotation.z = 0.2;
  const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 10), primaryMat);
  armR.position.set(0.4, 0.95, 0.05);
  armR.rotation.z = -0.2;
  bodyGroup.add(armL, armR);
  group.add(bodyGroup);

  // 4. ACCESSORIES
  if (cfg.gender === 'female') {
    if (cfg.accessory === 0) {
      // Cute Headband / Bando
      const bandoGeo = new THREE.TorusGeometry(0.72, 0.05, 8, 24, Math.PI);
      const bandoMat = new THREE.MeshToonMaterial({ color: '#ec4899' });
      const bando = new THREE.Mesh(bandoGeo, bandoMat);
      bando.rotation.x = -Math.PI / 2.3;
      bando.position.set(0, 1.8, 0.1);
      group.add(bando);
    } else if (cfg.accessory === 1) {
      // Cashier Visor / Hat
      const hatBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.52, 0.15, 18), new THREE.MeshToonMaterial({ color: '#f59e0b' }));
      hatBase.position.set(0, 2.25, 0);
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.04, 0.3), new THREE.MeshToonMaterial({ color: '#f59e0b' }));
      visor.position.set(0, 2.2, 0.35);
      visor.rotation.x = 0.2;
      group.add(hatBase, visor);
    } else if (cfg.accessory === 2) {
      // Earrings
      const earMat = new THREE.MeshToonMaterial({ color: '#fbbf24' });
      const earL = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), earMat);
      earL.position.set(-0.68, 1.5, 0);
      const earR = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), earMat);
      earR.position.set(0.68, 1.5, 0);
      group.add(earL, earR);
    }
  } else {
    if (cfg.accessory === 0) {
      // Male Cashier Cap
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.58, 0.2, 18), new THREE.MeshToonMaterial({ color: '#0284c7' }));
      cap.position.set(0, 2.25, -0.05);
      const brim = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.35), new THREE.MeshToonMaterial({ color: '#0284c7' }));
      brim.position.set(0, 2.2, 0.38);
      brim.rotation.x = 0.15;
      group.add(cap, brim);
    } else if (cfg.accessory === 1) {
      // Glasses
      const glassesMat = new THREE.MeshToonMaterial({ color: '#1e293b' });
      const frameL = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 6, 16), glassesMat);
      frameL.position.set(-0.25, 1.62, 0.64);
      const frameR = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 6, 16), glassesMat);
      frameR.position.set(0.25, 1.62, 0.64);
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.03, 0.02), glassesMat);
      bridge.position.set(0, 1.62, 0.64);
      group.add(frameL, frameR, bridge);
    }
  }

  return group;
}
