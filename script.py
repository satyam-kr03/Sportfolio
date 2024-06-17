import requests

BASE_URL = 'http://localhost:8000'

# Create a new student
new_student = {
    'name': 'John Doe',
    'email': 'john.doe@example.com',
    'course': 'Introduction to Computer Science',
    'gpa': 3.8
}

response = requests.post(f'{BASE_URL}/students/', json=new_student)
print(f'Create Student Response: {response.status_code}')
print(response.json())

# List all students
response = requests.get(f'{BASE_URL}/students/')
print(f'\nList Students Response: {response.status_code}')
students = response.json()['students']
for student in students:
    print(student)

# Get a specific student
student_id = students[0]['id']
response = requests.get(f'{BASE_URL}/students/{student_id}')
print(f'\nGet Student Response: {response.status_code}')
print(response.json())

# Update a student
update_data = {
    'name': 'Jane Doe',
    'email': 'jane.doe@example.com'
}

response = requests.put(f'{BASE_URL}/students/{student_id}', json=update_data)
print(f'\nUpdate Student Response: {response.status_code}')
print(response.json())

# Delete a student
# response = requests.delete(f'{BASE_URL}/students/{student_id}')
# print(f'\nDelete Student Response: {response.status_code}')