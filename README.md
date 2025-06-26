# SkinSight

SkinSight is an AI-powered web application that allows users to diagnose common skin diseases by simply uploading an image. The app delivers instant, personalized results with background information and actionable next steps—including nearby medical help—using cutting-edge AI tools.

## 🧠 Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Node.js (API routes)
- **AI/ML**:
  - Roboflow Hosted API (for image classification – trained on 8000+ labeled skin disease images)
  - OpenAI GPT-4.1-nano (for providing human-readable diagnosis info, treatment advice, and clinic suggestions)

## 🚀 Features

- 📸 Upload a photo of your skin condition via an intuitive interface
- 🔍 Get instant classification of the disease using a trained Roboflow model
- 📘 Receive a detailed explanation of the condition using the OpenAI API
- 🏥 View suggested next steps, including over-the-counter meds and links to nearby clinics

## 🧪 How It Works

1. **User uploads an image**
2. **Roboflow model** analyzes and classifies the skin condition
3. **GPT-4.1-nano** explains the condition and recommends treatment/prevention
4. **Nearby clinics** and relevant medications are suggested (via 3rd party APIs or static dataset)

## 📦 Installation

```bash
git clone https://github.com/your-username/skinsight.git
cd skinsight
npm install
````

Create a `.env.local` file with:

```
ROBOFLOW_API_KEY=your-roboflow-key
OPENAI_API_KEY=your-openai-key
NEXT_PUBLIC_MAPS_API_KEY=optional-if-using-maps
```

Then run:

```bash
npm run dev
```

Visit `http://localhost:3000` to test it locally.

## 📂 Project Structure

```
/pages
  └── index.tsx             # Upload + Result UI
  └── api/
       └── diagnose.ts      # Roboflow + GPT integration

/components
  └── UploadForm.tsx
  └── ResultCard.tsx

/lib
  └── openai.ts
  └── roboflow.ts
```

## 🤖 AI Model Info

* **Roboflow**: Trained on 8000+ labeled dermatological images across 8+ common conditions
* **OpenAI**: GPT-4.1-nano used to generate accessible medical summaries and advice

## 🧼 Disclaimer

This is not a replacement for professional medical diagnosis. SkinSight is an educational tool designed to be a preliminary opinion—always consult a licensed physician for serious concerns.

## 📅 Timeline

Built in May 2025 as a solo submission to JamHacks 9.

Skincare meets software 🌞
