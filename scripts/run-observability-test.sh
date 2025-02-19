#!/bin/bash

# Ensure pip is installed
if ! command -v pip &> /dev/null; then
    echo "pip is not installed. Please install Python and pip first."
    exit 1
fi

# Install required package
pip install requests

# Run the test script
python scripts/test-observability.py