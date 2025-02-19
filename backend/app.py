from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from flask_cors import CORS  # Import CORS to handle cross-origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS

app.config['UPLOAD_FOLDER'] = 'C:\\Users\\Vyshnavi\\OneDrive\\Desktop\\SignatureVerification\\backend\\uploads'

# Load pre-trained model
model = load_model('C:\\Users\\Vyshnavi\\OneDrive\\Desktop\\SignatureVerification\\cnn_model\\signature_verification_cnn_model.h5')

@app.route('/verify', methods=['POST'])
def verify_signature():
    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    # Preprocess image
    image = cv2.imread(filepath)
    image = cv2.resize(image, (224, 224))
    image = np.expand_dims(image, axis=0) / 255.0

    # Predict
    prediction = model.predict(image)
    result = "genuine" if prediction[0][0] > 0.5 else "forged"
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
