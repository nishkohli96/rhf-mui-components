echo "📦 Packaging @nish1896/rhf-mui-components"

echo "🛠️ Building the package 📦"
# Exit if build fails
yarn lib || exit 1

cd packages/rhf-mui-components/dist
npm pack --pack-destination ../
