#!/bin/bash
# This script copies index-updated.html to index.html
# Run this locally after cloning the repository

cp index-updated.html index.html
git add index.html
git commit -m "Deploy: Copy full research paper from index-updated.html to index.html"
git push origin main

echo "✅ index.html updated with full research paper!"
echo "🌐 Visit: https://brokenspagheti.github.io/wanda-network-state-city/"
