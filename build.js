#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const process = require('process');

function run(cmd, cwd = process.cwd()) {
  try {
    console.log(`\n➜ ${cmd}`);
    execSync(cmd, { 
      stdio: 'inherit',
      cwd,
      env: { ...process.env, NPM_CONFIG_PRODUCTION: 'false' }
    });
  } catch (error) {
    console.error(`✗ Command failed: ${cmd}`);
    process.exit(1);
  }
}

console.log('🔧 Starting build process...\n');

// Install dependencies
console.log('📦 Installing backend dependencies...');
run('npm install', path.join(process.cwd(), 'backend'));

console.log('📦 Installing frontend dependencies...');
run('npm install', path.join(process.cwd(), 'frontend'));

// Generate Prisma
console.log('\n🔨 Generating Prisma client...');
run('node ./backend/node_modules/prisma/build/index.js generate --schema=./backend/prisma/schema.prisma');

// Build backend
console.log('\n🏗️  Building backend...');
run('npm run build', path.join(process.cwd(), 'backend'));

// Build frontend
console.log('\n🏗️  Building frontend...');
run('npm run build', path.join(process.cwd(), 'frontend'));

console.log('\n✅ Build completed successfully!');
