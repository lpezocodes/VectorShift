# VectorShift 

VectorShift is a web-based tool designed for creating, configuring, and validating workflow pipelines through an intuitive drag-and-drop interface. By leveraging advanced node abstraction, VectorShift allows for seamless customization and scalability across various node types such as inputs, outputs, and large language models (LLMs). This platform simplifies pipeline design by reducing redundancy and providing a consistent and reusable logic structure, making it ideal for machine learning and AI workflow orchestration. Built with React on the frontend and Python/FastAPI on the backend, VectorShift offers a robust and scalable solution for workflow automation and pipeline validation.

## Features 🚀

VectorShift comes equipped with a suite of powerful features:

- **Node Abstraction**: Simplifies node creation by implementing reusable logic and consistent styles, making it easier to scale and customize nodes.
- **Drag-and-Drop UI**: Enables effortless pipeline construction and visualization through an intuitive interface.
- **Real-Time Validation**: Ensures pipelines adhere to Directed Acyclic Graph (DAG) principles by detecting and highlighting errors like cyclic dependencies.
- **Custom Nodes**: Supports specialized node types, including sliders, numeric inputs, and date pickers, for flexible and dynamic workflows.
- **Backend Integration**: Facilitates seamless communication between the frontend and backend for pipeline validation, node counting, and DAG compliance checks.

## Tech Stack 🛠️

VectorShift utilizes a modern tech stack to ensure optimal performance and maintainability:

- **Frontend**: React, JavaScript, and Material UI.
- **Backend**: Python, FastAPI, and Uvicorn.
- **Package Management**: ```npm``` for frontend dependencies and ```pip``` for backend dependencies.
  
## Setup Instructions 📦

Follow the steps below to set up and run the VectorShift project locally:

**1. Clone the Repository**

  Clone the repository to your local machine and navigate into the project folder and dev branch:
  
  ```bash
  git clone <repository-url>
  cd VectorShift
  git checkout dev
  ```

**2. Backend Setup**

Navigate to the backend folder:
```bash
cd backend
```
Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```
Install the required dependencies:
```bash
pip install -r requirements.txt
```
Start the backend server
```bash
uvicorn main:app --reload
```
The backend server will run at http://localhost:8000.

**3. Frontend Setup**
Navigate to the frontend folder:
```bash
cd frontend
```
Install the required dependencies:
```bash
npm install
```
Start the frontend server
```bash
npm start
```
The frontend server will run at http://localhost:3000.

# 🚨 Disclaimer  

This project was originally built as a technical assessment for a company called **VectorShift**. After completing the assignment, the company **ghosted me** without any feedback or follow-up.  

That said, I had a **ton of fun** designing and developing this tool! 🚀 I’m sharing it publicly because I believe in showcasing the work I put effort into, especially when it involves **Python, React.js, FastAPI, and workflow automation**.  

This project is **not affiliated with VectorShift in any official capacity**—it’s an independent portfolio piece that demonstrates my ability to build **scalable, intuitive workflow solutions**.
