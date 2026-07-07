#!/bin/bash

# Exit immediately if any command fails (i.e., returns a non-zero exit code).
set -euo pipefail

REQUIRED_PNPM_VERSION="11.10.0"
REQUIRED_TURBO_VERSION="2.10.0"
PKG_NAME="@nish1896/rhf-mui-components"

echo "🏁 Initiating Setup..."
echo "🔍 Checking for global dependencies..."

# Ensure nvm is loaded
export NVM_DIR="$HOME/.nvm"

if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
  if [ ! -f ".nvmrc" ]; then
    echo "❌ .nvmrc not found."
    exit 1
  fi
  echo "🔧 Using Node version from .nvmrc"
  nvm install
  nvm use
elif command -v node &> /dev/null; then
  echo "⚠️ nvm not found, using system Node."
else
  echo "❌ Neither nvm nor node is installed."
  exit 1
fi
echo "✅ Node version: $(node -v)"

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

# Check for Turbo
echo "🔍 Checking for Turbo..."
if [ "$(turbo --version 2>/dev/null || true)" != "$REQUIRED_TURBO_VERSION" ]; then
  echo "📦 Installing turbo@$REQUIRED_TURBO_VERSION..."
  npm install -g turbo@$REQUIRED_TURBO_VERSION
else
  echo "✅ turbo@$REQUIRED_TURBO_VERSION already installed."
fi

# Clean old dependencies
echo "🧹 Removing old dependencies..."
find . -name node_modules -type d -prune -exec rm -rf {} + 2>/dev/null || true

# Install dependencies and build the local package
echo "Installing Dependencies & Building Package 🛠️"
pnpm install --frozen-lockfile

pnpm --filter "$PKG_NAME" run lib:build

# Globally install rimraf
npm i -g rimraf

echo "✅ Setup Complete! 🎉🎉🎉"
