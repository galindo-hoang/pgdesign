#!/bin/bash

# Development server for React build with SPA routing
echo "🚀 Starting Development Server..."
echo "📍 Local: http://localhost:3000"
echo "🌐 Network: http://192.168.1.8:3000"
echo "📱 SPA routing enabled (all routes redirect to index.html)"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start server with SPA routing support
npx serve -s build -l 3000 --single 