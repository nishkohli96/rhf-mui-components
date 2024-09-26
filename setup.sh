# Install Dependencies & Build Package
echo "🏁 Initiating Setup..."
echo "Installing Dependencies & Building Package 🛠️"
yarn
yarn lib:build

# Link the package
echo "Linking Package... 🔗"
cd packages/rhf-mui-components/dist
yarn link

cd ../../../apps/rhf-mui-demo
yarn link @nish1896/rhf-mui-components
echo " ✅ Setup Complete! 🎉🎉🎉"