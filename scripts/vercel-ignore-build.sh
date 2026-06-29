# Prevent vercel in creating build and deploys for
# `version-3` related branches, since the code for them
# has been deployed on Netlify.
#
# For Vercel Project, need to configure this script in -
# Vercel → Project → Settings → Build and Deployment → Ignored Build Step
#
#!/bin/bash

BRANCH="${VERCEL_GIT_COMMIT_REF}"
TAG="${VERCEL_GIT_COMMIT_TAG}"

echo "Branch: $BRANCH"
echo "Tag: $TAG"

# Skip branch "version-3"
if [[ "$BRANCH" == "version-3" ]]; then
  echo "⏭️ Skipping version-3"
  exit 0
fi

# Skip branches like v_3.0, v_3.1, v_3.10
if [[ "$BRANCH" =~ ^v_3\.[0-9]+$ ]]; then
  echo "⏭️ Skipping $BRANCH"
  exit 0
fi

# Skip tags like v3.0, v3.1.2, v3.10
if [[ "$TAG" =~ ^v3\.[0-9]+(\.[0-9]+)?$ ]]; then
  echo "⏭️ Skipping tag $TAG"
  exit 0
fi

echo "✅ Building"
exit 1
