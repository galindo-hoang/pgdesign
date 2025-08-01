#!/bin/bash

# Start the React build server with SPA routing support
echo "Starting React build server with SPA routing..."
echo "Server will be available at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

npx serve -s build -l 3000 --single 