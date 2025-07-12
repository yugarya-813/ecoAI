#!/usr/bin/env python3
"""
EcoAI Backend API Testing Script
Tests all FastAPI endpoints for the EcoAI sustainability SaaS application
"""

import requests
import sys
import json
from datetime import datetime

class EcoAIAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })

    def test_health_endpoint(self):
        """Test the health check endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy" and "message" in data:
                    self.log_test("Health Check Endpoint", True)
                    print(f"   Response: {data}")
                    return True
                else:
                    self.log_test("Health Check Endpoint", False, f"Invalid response format: {data}")
            else:
                self.log_test("Health Check Endpoint", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Health Check Endpoint", False, f"Exception: {str(e)}")
        
        return False

    def test_stats_endpoint(self):
        """Test the stats endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/stats", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                expected_keys = ["websites_optimized", "carbon_reduced", "load_time_improved", "automation_level"]
                
                if all(key in data for key in expected_keys):
                    self.log_test("Stats Endpoint", True)
                    print(f"   Stats: {data}")
                    return True
                else:
                    self.log_test("Stats Endpoint", False, f"Missing expected keys. Got: {list(data.keys())}")
            else:
                self.log_test("Stats Endpoint", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Stats Endpoint", False, f"Exception: {str(e)}")
        
        return False

    def test_waitlist_endpoint_valid(self):
        """Test waitlist endpoint with valid email"""
        test_email = f"test_{datetime.now().strftime('%H%M%S')}@example.com"
        
        try:
            payload = {
                "email": test_email,
                "company": "Test Company",
                "name": "Test User"
            }
            
            response = requests.post(
                f"{self.base_url}/api/waitlist", 
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if (data.get("success") == True and 
                    "message" in data and 
                    data.get("data", {}).get("email") == test_email):
                    self.log_test("Waitlist Endpoint (Valid Email)", True)
                    print(f"   Response: {data}")
                    return True
                else:
                    self.log_test("Waitlist Endpoint (Valid Email)", False, f"Invalid response format: {data}")
            else:
                self.log_test("Waitlist Endpoint (Valid Email)", False, f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Waitlist Endpoint (Valid Email)", False, f"Exception: {str(e)}")
        
        return False

    def test_waitlist_endpoint_invalid(self):
        """Test waitlist endpoint with invalid email"""
        try:
            payload = {"email": "invalid-email"}
            
            response = requests.post(
                f"{self.base_url}/api/waitlist", 
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Waitlist Endpoint (Invalid Email)", True)
                print(f"   Correctly rejected invalid email with status 422")
                return True
            else:
                self.log_test("Waitlist Endpoint (Invalid Email)", False, f"Expected 422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Waitlist Endpoint (Invalid Email)", False, f"Exception: {str(e)}")
        
        return False

    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            response = requests.options(f"{self.base_url}/api/health", timeout=10)
            
            cors_headers = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*"
            }
            
            cors_ok = True
            missing_headers = []
            
            for header, expected_value in cors_headers.items():
                actual_value = response.headers.get(header)
                if not actual_value or (expected_value != "*" and actual_value != expected_value):
                    cors_ok = False
                    missing_headers.append(f"{header}: expected '{expected_value}', got '{actual_value}'")
            
            if cors_ok:
                self.log_test("CORS Configuration", True)
                return True
            else:
                self.log_test("CORS Configuration", False, f"Missing/incorrect headers: {missing_headers}")
                
        except Exception as e:
            self.log_test("CORS Configuration", False, f"Exception: {str(e)}")
        
        return False

    def test_server_connectivity(self):
        """Test basic server connectivity"""
        try:
            response = requests.get(self.base_url, timeout=5)
            # FastAPI root should return 404 or redirect, but server should respond
            if response.status_code in [200, 404, 307]:
                self.log_test("Server Connectivity", True)
                return True
            else:
                self.log_test("Server Connectivity", False, f"Unexpected status: {response.status_code}")
                
        except Exception as e:
            self.log_test("Server Connectivity", False, f"Exception: {str(e)}")
        
        return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting EcoAI Backend API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 50)
        
        # Run all tests
        self.test_server_connectivity()
        self.test_health_endpoint()
        self.test_stats_endpoint()
        self.test_waitlist_endpoint_valid()
        self.test_waitlist_endpoint_invalid()
        self.test_cors_headers()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed! Backend API is working correctly.")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} test(s) failed.")
            return False

def main():
    """Main test execution"""
    # Test against the public backend URL
    backend_url = "https://demobackend.emergentagent.com"
    
    print(f"EcoAI Backend API Test Suite")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print(f"Target URL: {backend_url}")
    
    tester = EcoAIAPITester(backend_url)
    success = tester.run_all_tests()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())