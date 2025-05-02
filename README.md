# Local Image Finder 🔍

A desktop application that allows searching through local images using natural language queries, powered by AI.

https://github.com/user-attachments/assets/0caf2010-e269-485a-bf0c-27ec073c8a5c



## ✨ How It Works

- Uses AI to understand and index your local images
- Converts images into searchable vector embeddings
- Enables natural language search queries
- Works completely offline after initial setup

## 🛠️ Tech Stack

- **Frontend**: React + Electron
- **Backend**: Python Flask
- **AI Model**: Moondream
- **Vector Storage**: ChromaDB

## 📋 Prerequisites

- Windows 10 or later
- Node.js v16+
- Python 3.8+
- Dedicated NVIDIA GPU

## 🚀 Quick Start

### Backend Setup

````bash
# Navigate to backend directory
cd local_img_app/backend

# Create and activate virtual environment
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download Moondream model
# Place moondream-2b-int8.mf in the backend directory

#run python server
python backend.py
````

### Frontend Setup

````bash
# Navigate to project root
cd local_img_app

# Install dependencies
npm install

# Start development server
npm run dev
````
### Model Setup
- [Moondream 2B](https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-2b-int8.mf.gz?download=true)
- [Moondream 0.5B](https://huggingface.co/vikhyatk/moondream2/resolve/9dddae84d54db4ac56fe37817aeaeb502ed083e2/moondream-0_5b-int8.mf.gz?download=true)

## 💡 Usage
- Launch the application
- Select folder with images to encode
- Wait for indexing to complete
- Search using natural language
- Press enter then VOILÀ
### Note
Encoding image takes a while(20-30s/image currently). 
If you just want to quickly test the app out, in backend folder, there is a test folder with a few image already encoded. Feel free to pick a few and test out the app capabilities.
