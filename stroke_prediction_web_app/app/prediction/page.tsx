'use client'

import '../styles/prediction_page.css';
import React, { useState } from 'react';

interface PredictionProps {}

const Prediction: React.FC<PredictionProps> = () => {
  const [selectedOption1, setSelectedOption1] = useState<string>('');
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [selectedOption3, setSelectedOption3] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [glucoseLevel, setGlucoseLevel] = useState<string>('');
  const [bmi, setBMI] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [smokingStatus, setSmokingStatus] = useState<string>('');
  const [submissionResult, setSubmissionResult] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };

  const handleGlucoseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGlucoseLevel(event.target.value);
  };

  const handleBMIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBMI(event.target.value);
  };

  const handleHypertensionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption1(event.target.value);
  };

  const handleHeartDiseaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption2(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleSmokingStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSmokingStatus(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      age,
      hypertension: selectedOption1,
      heartDisease: selectedOption2,
      glucoseLevel,
      bmi,
      gender,
      smokingStatus,
    };
    
    try {
      const response = await fetch('http://127.0.0.1:8080/api/model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      setSubmissionResult(result.prediction); // Assuming the backend returns a message
      // Display prediction
      console.log(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };  

  return (
    <main className="home">
      <div className="content">
        <form>
          <p className="info-tag">
            Enter your personal information to predict how likely it is for you to get a stroke.
          </p>

          <label htmlFor="age">Enter Age:</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={handleInputChange}
            placeholder="Enter age..."
            className='option'
          />

          <label htmlFor="hypertension">Enter Hypertension:</label>
          <select id="hypertension" value={selectedOption1} onChange={handleHypertensionChange}>
            <option value="">Select...</option>
            <option value="0">Do Not Have</option>
            <option value="1">Have</option>
          </select>

          <label htmlFor="heartDisease">Enter Heart Disease:</label>
          <select id="heartDisease" value={selectedOption2} onChange={handleHeartDiseaseChange}>
            <option value="">Select...</option>
            <option value="0">Do not have any heart diseases</option>
            <option value="1">Do have a heart disease</option>
          </select>

          <label htmlFor="glucoseLevel">Enter Average Glucose Level:</label>
          <input
            type="text"
            id="glucoseLevel"
            value={glucoseLevel}
            onChange={handleGlucoseChange}
            placeholder="Enter average..."
          />

          <label htmlFor="bmi">Enter BMI:</label>
          <input
            type="text"
            id="bmi"
            value={bmi}
            onChange={handleBMIChange}
            placeholder="Enter BMI..."
          />

          <label htmlFor="gender">Enter Gender:</label>
          <select id="gender" value={gender} onChange={handleGenderChange}>
            <option value="">Select...</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>

          <label htmlFor="smokingStatus">Enter Smoking Status:</label>
          <select id="smokingStatus" value={smokingStatus} onChange={handleSmokingStatusChange}>
            <option value="">Select...</option>
            <option value="0">Unknown</option>
            <option value="1">Formerly smoked</option>
            <option value="2">Never smoked</option>
            <option value="3">Currently smokes</option>
          </select>

          <button onClick={handleSubmit} className="btn">
            Submit
          </button>
          {submissionResult && (
            <p className="submission-result">{`Submission Result: ${submissionResult}`}</p>
          )}
        </form>
      </div>
    </main>
  );
};

export default Prediction;
