from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
import sklearn
import pandas as pd

# App instance
app = Flask(__name__)
CORS(app, origins="*")

@app.route('/api/model', methods=['POST'])
def handle_prediction():
    data = request.get_json()
    print(data)

    print("DIRECTORY: ", os.path.join(os.getcwd(), 'trained_model/trained_model.sav', 'rb'))
    # Load the model
    model = pickle.load(open(os.path.join(os.getcwd(), 'trained_model/trained_model.sav'), 'rb'))

    # Load features
    age = float(int(data['age']))
    hypertension = int(data['hypertension'])
    heart_disease = int(data['heartDisease'])
    avg_glucose_level = float(data['glucoseLevel'])
    bmi = float(data['bmi'])
    gender = int(data['gender'])
    smoking_status = int(data['smokingStatus'])

    # Set gender
    if gender == 0: # Male
        gender_male = 1
        gender_female = 0
        gender_other = 0
    elif gender == 1: # Female
        gender_male = 0
        gender_female = 1
        gender_other = 0
    else:
        gender_male = 0
        gender_female = 0
        gender_other = 1

    # Set smoking status
    if smoking_status == 0:
        smoking_status_unknown = 1
        smoking_status_formerly = 0
        smoking_status_never = 0
        smoking_status_smokes = 0
    if smoking_status == 1:
        smoking_status_unknown = 0
        smoking_status_formerly = 1
        smoking_status_never = 0
        smoking_status_smokes = 0
    if smoking_status == 2:
        smoking_status_unknown = 0
        smoking_status_formerly = 0
        smoking_status_never = 1
        smoking_status_smokes = 0
    if smoking_status == 3:
        smoking_status_unknown = 0
        smoking_status_formerly = 0
        smoking_status_never = 0
        smoking_status_smokes = 1
    
    data_dict = {
        'age': [age],
        'hypertension': [hypertension],
        'heart_disease': [heart_disease],
        'avg_glucose_level': [avg_glucose_level],
        'bmi': [bmi],
        'gender_Female': [gender_female],
        'gender_Male': [gender_male],
        'gender_Other': [gender_other],
        'smoking_status_Unknown': [smoking_status_unknown],
        'smoking_status_formerly smoked': [smoking_status_formerly],
        'smoking_status_never smoked': [smoking_status_never],
        'smoking_status_smokes': [smoking_status_smokes],
    }

    # Make prediction
    x = pd.DataFrame(data_dict)
    y = model.predict(x)
    print("Prediction: ", y[0])

    # Return a response
    return jsonify({'message': 'Prediction successful'})

# Running app
if __name__ == '__main__':
    app.run(debug=True, port=8080)
