## Eg: sh bump-version.sh 3.0.2

#!/usr/bin/env bash
set -euo pipefail

# Usage: ./bump-version.sh 3.0.2
VERSION=$1

# Ensure jq is installed for JSON editing
if ! command -v jq &>/dev/null; then
  echo "jq not found. Attempting to install..."
  if command -v brew &>/dev/null; then
    brew install jq
  elif command -v apt-get &>/dev/null; then
    sudo apt-get update && sudo apt-get install -y jq
  else
    echo "❌ Could not auto-install jq. Please install it manually:"
    echo "   macOS: brew install jq"
    echo "   Ubuntu/Debian: sudo apt-get install jq"
    exit 1
  fi
fi

# Detect package manager
if [ -f "pnpm-workspace.yaml" ]; then
  PM="pnpm"
elif [ -f "yarn.lock" ]; then
  PM="yarn"
else
  echo "❌ Could not detect pnpm or yarn workspace."
  exit 1
fi

echo "Bumping all workspace package versions to $VERSION using $PM..."

# Loop through all package.json files in the workspace
find . -name "package.json" -not -path "*/node_modules/*" | while read -r pkg; do
  echo "Updating $pkg to version $VERSION"
  tmp=$(mktemp)
  jq --arg ver "$VERSION" '.version = $ver' "$pkg" > "$tmp" && mv "$tmp" "$pkg"
done

# Run install to refresh lockfile
$PM install

echo "✅ All package versions set to $VERSION"
