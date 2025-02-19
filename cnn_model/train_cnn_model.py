import os
import sys
import io
import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import VGG16
import numpy as np
# Force the default encoding to UTF-8 to prevent issues with characters
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Ensure the correct encoding is used throughout
os.environ['PYTHONIOENCODING'] = 'utf-8'

# Dataset paths
train_dir = r'C:\Users\Vyshnavi\OneDrive\Desktop\SignatureVerification\backend\dataset\train'
test_dir = r'C:\Users\Vyshnavi\OneDrive\Desktop\SignatureVerification\backend\dataset\test'

# Constants
IMG_SIZE = (224, 224)  # Resize images to 224x224 (VGG16 input size)
BATCH_SIZE = 32

# Image Preprocessing and Data Augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255, 
    rotation_range=30,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode="nearest"
)

test_datagen = ImageDataGenerator(rescale=1./255)

# Data Generators
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary',  # Assuming binary classification: genuine or forged
    shuffle=True
)

test_generator = test_datagen.flow_from_directory(
    test_dir,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary',
    shuffle=False
)

# Building the Model using VGG16
base_model = VGG16(include_top=False, weights='imagenet', input_shape=(224, 224, 3))
base_model.trainable = False  # Freeze the base model layers

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(1024, activation='relu'),
    layers.Dense(1, activation='sigmoid')  # Output layer for binary classification
])

# Compile the model
model.compile(
    loss='binary_crossentropy', 
    optimizer='adam', 
    metrics=['accuracy']
)

# Train the model
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // BATCH_SIZE,
    epochs=10,  # You can adjust the number of epochs
    validation_data=test_generator,
    validation_steps=test_generator.samples // BATCH_SIZE
)

# Save the model
MODEL_PATH = r'C:\Users\Vyshnavi\OneDrive\Desktop\SignatureVerification\cnn_model\signature_verification_cnn_model.h5'
model.save(MODEL_PATH)
print(f"Model saved to {MODEL_PATH}")

# Evaluate the model on the test data
test_loss, test_accuracy = model.evaluate(test_generator)
print(f"Test Accuracy: {test_accuracy * 100:.2f}%")
