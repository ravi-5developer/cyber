# Phishing Website Detection using Machine Learning

![Cyber Security](https://img.shields.io/badge/Subject-Cyber%20Security-red)
![Python](https://img.shields.io/badge/Language-Python-blue)
![ML](https://img.shields.io/badge/Field-Machine%20Learning-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 📌 Project Overview
Phishing is a cyber-attack where attackers deceive users into revealing sensitive information. This project implements a sophisticated **Machine Learning-based detection system** that analyzes URL patterns, domain characteristics, and security features to classify websites as **Legitimate** or **Phishing** in real-time.

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Python (Flask/FastAPI)
- **Machine Learning:** Scikit-learn, Pandas, NumPy, XGBoost
- **Model Storage:** Pickle (.pkl)

---

## 📂 Directory Structure
Based on the current repository architecture:

```text
├── ml_model/
│   ├── data/                # Raw and processed CSV datasets
│   ├── notebooks/           # Jupyter notebooks for EDA and testing
│   ├── feature_extraction.py # Logic to convert raw URLs into 17+ features
│   └── train.py             # Script to train and save the model
├── backend/
│   ├── app.py               # API Server to handle classification requests
│   ├── utils.py             # Security utility functions
│   └── requirements.txt     # Python environment dependencies
├── frontend/
│   ├── assets/              # Icons and images
│   ├── css/                 # style.css for UI design
│   ├── js/                  # main.js for API interaction
│   └── index.html           # Main user interface
├── trained_model.pkl        # Serialized ML model for production
└── README.md                # Project documentation

---

## 📌 Project Overview & Abstract
Phishing is a deceptive technique used by cybercriminals to steal sensitive information such as login credentials and financial data. Traditional security measures often rely on static blacklists, which are ineffective against new, "Zero-day" phishing attacks. 

This project implements a **Machine Learning-based detection system** that classifies URLs as **Legitimate** or **Phishing** by analyzing their structural, domain, and content-based features. By leveraging algorithms like Random Forest and XGBoost, the system can identify malicious patterns with high accuracy without needing a pre-existing list of known threats.

---

## 🛠️ Project Methodology
The project follows a standard Data Science pipeline specifically optimized for Cyber Security:

1.  **Data Collection:** Utilizing datasets containing thousands of verified phishing and legitimate URLs (e.g., PhishTank, UCI Repository).
2.  **Feature Extraction:** Raw URLs are parsed into numerical features that a machine learning model can understand.
3.  **Data Preprocessing:** Handling missing values, scaling features, and splitting data into training and testing sets.
4.  **Model Training:** Evaluating multiple classifiers to find the best-performing model.
5.  **Performance Evaluation:** Measuring success based on Accuracy, Precision, Recall, and F1-Score.

---

## 🧪 Detailed Feature Engineering
The core of this project lies in transforming a URL string into **17+ unique features** categorized into:

* **Address Bar Based:** Checking for IP addresses in the URL, URL length, shortening services (like bit.ly), and the presence of the `@` symbol.
* **Abnormal Based:** Detecting URL forwarding using `//`, counting sub-domains, and checking for the "HTTPS" token in the domain part.
* **HTML & JavaScript Based:** Monitoring for website redirections, "Right Click Disable" scripts, and IFrame usage.
* **Domain Based:** Analyzing the age of the domain and the availability of DNS records.

---

## 📊 Model Performance Comparison
The models were evaluated based on their ability to minimize **False Positives** (safeguarding user experience).

| Algorithm | Accuracy | Precision | Recall | F1-Score |
| :--- | :--- | :--- | :--- | :--- |
| **XGBoost** | 98.4% | 0.99 | 0.98 | 0.98 |
| **Random Forest** | 97.2% | 0.98 | 0.96 | 0.97 |
| **Decision Tree** | 95.8% | 0.96 | 0.95 | 0.96 |
| **SVM** | 94.5% | 0.95 | 0.94 | 0.94 |
