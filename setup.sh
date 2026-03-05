# Install Dependencies & Build Package
echo "🏁 Initiating Setup..."

# Check for yarn
if ! command -v yarn &> /dev/null; then
  echo "📦 yarn not found. Installing..."
  npm install -g yarn@1.22.22
else
  echo "✅ yarn is globally installed."
fi

echo "Installing Dependencies & Building Package 🛠️"
yarn
yarn lib

# Globally install rimraf
npm i -g rimraf

# Link the package
echo "Linking Package... 🔗"
cd packages/rhf-mui-components/dist
yarn link

cd ../../../apps/rhf-mui-demo
yarn link @nish1896/rhf-mui-components
echo " ✅ Setup Complete! 🎉🎉🎉"