#!/bin/sh

# Set production environment
NODE_ENV=production

# Create log folder
mkdir logs

# Install dependancies
npm i

# Run the server
npm run prod
