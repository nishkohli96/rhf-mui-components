#!/bin/bash

REQUIRED_PNPM_VERSION="10.13.1"
PKG_NAME="@nish1896/rhf-mui-components"
PKG_PATH="packages/rhf-mui-components"

echo "🏁 Initiating Setup..."

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
pnpm --filter "$PKG_NAME" run lib

# Link the package globally
echo "Linking Package Globally... 🔗"
cd "$PKG_PATH/dist"
pnpm link
cd -

# Link to all consuming apps
CONSUMER_APPS=("apps/rhf-mui-demo")
for app in "${CONSUMER_APPS[@]}"; do
  echo "Linking $PKG_NAME in $app..."
  cd "$app"
  pnpm link "$PKG_NAME"
  cd -
done

echo "✅ Setup Complete! 🎉🎉🎉"
