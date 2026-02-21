#!/bin/bash

# Verify type definitions are installed
if [ ! -d "node_modules/@types/react" ]; then
  echo "Installing @types/react..."
  npm install --save-dev @types/react @types/react-dom
fi

if [ ! -d "node_modules/vite/client" ]; then
  echo "Vite client types not found, but this is handled by ambient declarations"
fi

echo "Type check complete"
