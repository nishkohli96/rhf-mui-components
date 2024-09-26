if [ -d "packages/rhf-mui-components/dist" ]; then
  echo "Publishing package on npm..."
	cd packages/rhf-mui-components/dist
	npm profile get
	npm publish --access public
else
  echo "Build does not exist."
fi
