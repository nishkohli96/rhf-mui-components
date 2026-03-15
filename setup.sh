#!/bin/bash

REQUIRED_PNPM_VERSION="10.30.3"
PKG_NAME="@nish1896/rhf-mui-components"
PKG_PATH="packages/rhf-mui-components"

echo "🏁 Initiating Setup..."

# Ensure nvm is loaded
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
else
  echo "❌ nvm is not installed. Please install nvm first."
  exit 1
fi

# Use Node version from .nvmrc
if [ -f ".nvmrc" ]; then
  echo "🔧 Using Node version from .nvmrc..."
  nvm install
  nvm use
else
  echo "⚠️ .nvmrc not found. Skipping Node version setup."
fi

# Check if pnpm is installed and the version
if command -v pnpm &> /dev/null; then
  CURRENT_PNPM_VERSION=$(pnpm -v)
  if [ "$(printf '%s\n' "$REQUIRED_PNPM_VERSION" "$CURRENT_PNPM_VERSION" | sort -V | head -n1)" != "$REQUIRED_PNPM_VERSION" ]; then
    echo "⚠️ pnpm version $CURRENT_PNPM_VERSION is older than $REQUIRED_PNPM_VERSION. Upgrading..."
    npm install -g pnpm@$REQUIRED_PNPM_VERSION
  else
    echo "✅ pnpm v$CURRENT_PNPM_VERSION is installed."
  fi
else
  echo "📦 pnpm not found. Installing v$REQUIRED_PNPM_VERSION..."
  npm install -g pnpm@$REQUIRED_PNPM_VERSION
fi

# Install dependencies and build the local package
echo "Installing Dependencies & Building Package 🛠️"
pnpm install
pnpm --filter "$PKG_NAME" run lib:build

# Globally install rimraf
npm i -g rimraf

echo "Linking Package @nish1896/rhf-mui-demo workspace. 🔗"
cd "./apps/rhf-mui-demo"
pnpm add "../../$PKG_PATH/dist"

echo "✅ Setup Complete! 🎉🎉🎉"
