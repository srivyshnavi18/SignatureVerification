from pymongo import MongoClient  # type: ignore

# MongoDB connection details
uri = "mongodb://localhost:27017/"
client = MongoClient(uri)

# Specify the database and collection
db = client["signatures_db"]
collection = db["2"]

# Array containing documents with username, password, and image path
P = [
    {
        "username": "vyshnavi",
        "password": "vyshu123",  # Replace with a hashed password for better security
         "image": {
        "path": "C:\\Users\\Vyshnavi\\OneDrive\\Desktop\\SignatureVerification\\backend\\uploads",
         }
    }
]

# Insert documents in P with error handling for duplicate _id
for doc in P:
    try:
        result = collection.insert_one(doc)
        # Print the inserted document details
        print(f"Inserted document with username: {doc['username']} and image path: {doc['image']['path']}")
    except Exception as e:
        if "E11000 duplicate key error" in str(e):
            # Print details of the document causing the error
            print(f"Duplicate key error for username: {doc['username']}")
        else:
            print(f"An error occurred: {e}")

# Close the connection
client.close()