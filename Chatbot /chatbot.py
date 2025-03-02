import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai

# Secure API Key
API_KEY = "AIzaSyCHaO_fHrrnttwyuWjSFznVrDAwGmB2xUo"
genai.configure(api_key=API_KEY)

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

def format_response(text):
    """Formats chatbot response for better readability"""
    formatted_text = text.replace("**", "<b>").replace("*", "</b>").replace("\n", "<br>")
    return formatted_text.strip()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    try:
        model = genai.GenerativeModel("gemini-1.5-pro")  # Updated model
        response = model.generate_content(user_input)

        if response and response.candidates:
            reply = format_response(response.candidates[0].content.parts[0].text)
        else:
            reply = "I'm not sure how to respond to that. Can you try rephrasing?"

    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
