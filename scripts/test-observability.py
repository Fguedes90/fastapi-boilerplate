import requests
import time
import random
from concurrent.futures import ThreadPoolExecutor

def make_request():
    """Make a request to the API and simulate different response times"""
    endpoints = [
        '/api/v1/users/me',  # Protected endpoint
        '/api/v1/login/access-token',  # Login endpoint
        '/api/v1/users',  # Users endpoint
    ]
    
    # Randomly select an endpoint
    endpoint = random.choice(endpoints)
    
    # Simulate some login attempts
    if endpoint == '/api/v1/login/access-token':
        data = {
            "username": "admin@fastapi.com",
            "password": "wrong-password"
        }
        try:
            response = requests.post(
                'http://localhost:8000' + endpoint,
                data=data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            print(f"Login attempt status: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Error making request: {e}")
        return

    # For other endpoints, just make GET requests
    try:
        response = requests.get('http://localhost:8000' + endpoint)
        print(f"Request to {endpoint} - Status: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")

def main():
    print("Starting API test script...")
    print("This script will generate traffic to help visualize metrics in Grafana")
    print("Press Ctrl+C to stop\n")

    # Use a thread pool to make concurrent requests
    with ThreadPoolExecutor(max_workers=3) as executor:
        while True:
            # Submit multiple requests
            futures = [executor.submit(make_request) for _ in range(3)]
            # Wait for all requests to complete
            for future in futures:
                future.result()
            # Wait a bit before the next batch
            time.sleep(1)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nScript stopped by user")